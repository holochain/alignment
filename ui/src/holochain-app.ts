// import {
//   FileStorageClient,
//   fileStorageClientContext,
// } from '@holochain-open-dev/file-storage';
import {
  ProfilesClient,
  ProfilesConfig,
  ProfilesStore,
  profilesStoreContext,
} from '@holochain-open-dev/profiles';
import '@holochain-open-dev/profiles/dist/elements/agent-avatar.js';
import '@holochain-open-dev/profiles/dist/elements/profile-prompt.js';
import '@holochain-open-dev/profiles/dist/elements/profile-list-item-skeleton.js';
import {
  ActionHash,
  AdminWebsocket,
  AppWebsocket,
  AppWebsocketConnectionOptions,
  encodeHashToBase64,
} from '@holochain/client';
import { provide } from '@lit/context';
import { LitElement, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import {HowController} from "./elements/how-controller"
import {HowStore} from "./how.store"
import {howContext} from "./types"
import { localized, msg } from '@lit/localize';

import { ScopedElementsMixin } from "@open-wc/scoped-elements";
import { WeaveClient, isWeContext, initializeHotReload, WAL, Hrl } from '@lightningrodlabs/we-applet';
import { appletServices } from './we';
import { HowUnit } from './elements/how-unit';
import { HowDocument } from './elements/how-document';

const appId = 'how'

enum RenderType {
  App,
  Unit,
  Document,
}

@localized()
@customElement('holochain-app')
export class HolochainApp extends ScopedElementsMixin(LitElement) {
  @state()
  loaded = false;

  // @provide({ context: fileStorageClientContext })
  // @property()
  // _fileStorageClient!: FileStorageClient;

  @provide({ context: howContext })
  @property()
  _howStore!: HowStore;

  @provide({ context: profilesStoreContext })
  @property()
  _profilesStore!: ProfilesStore;

  renderType = RenderType.App
  wal: WAL| undefined

  async firstUpdated() {

    const config:ProfilesConfig = {
      minNicknameLength: 3,
      avatarMode: "avatar-optional",
      additionalFields: [], // "Location","Hashtags", "Bio"// Custom app level profile fields
    };
    if ((import.meta as any).env.DEV) {
      try {
        await initializeHotReload();
      } catch (e) {
        console.warn("Could not initialize applet hot-reloading. This is only expected to work in a We context in dev mode.")
      }
    }
    
    let tokenResp;
    if (!isWeContext()) {
      const adminPort : string = import.meta.env.VITE_ADMIN_PORT
      const appPort : string = import.meta.env.VITE_APP_PORT
      const url = appPort ? `ws://localhost:${appPort}` : 'ws://localhost';

      if (adminPort) {
        const adminWebsocket = await AdminWebsocket.connect({url: new URL(`ws://localhost:${adminPort}`)})
        const x = await adminWebsocket.listApps({})
        tokenResp = await adminWebsocket.issueAppAuthenticationToken({
          installed_app_id: "how",
        });
        const cellIds = await adminWebsocket.listCellIds()
        await adminWebsocket.authorizeSigningCredentials(cellIds[0])
      }
      const params: AppWebsocketConnectionOptions = { url: new URL(url) };
      if (tokenResp) params.token = tokenResp.token;

      const appAgentClient = await AppWebsocket.connect(params)
    
      this._howStore = new HowStore(undefined, appAgentClient, "how")
      
      //@ts-ignore
      this._profilesStore = new ProfilesStore(new ProfilesClient(appAgentClient, 'how'), config);
    } else {
        const weClient = await WeaveClient.connect(appletServices);

        switch (weClient.renderInfo.type) {
          case "applet-view":
            switch (weClient.renderInfo.view.type) {
              case "main":
                // default is allready App
                break;
              case "block":
                switch(weClient.renderInfo.view.block) {
                  default:
                    throw new Error("Unknown applet-view block type:"+weClient.renderInfo.view.block);
                }
                break;
              case "asset":
                if (!weClient.renderInfo.view.recordInfo) {
                  throw new Error(
                    "How does not implement asset views pointing to DNAs instead of Records."
                  );
                } else {
                  switch (weClient.renderInfo.view.recordInfo.roleName) {
                    case "how":
                      switch (weClient.renderInfo.view.recordInfo.integrityZomeName) {
                        case "how_integrity":
                          switch (weClient.renderInfo.view.recordInfo.entryType) {
                            case "unitx":
                              this.renderType = RenderType.Unit
                              this.wal = weClient.renderInfo.view.wal
                              break;
                            case "document":
                              this.renderType = RenderType.Document
                              this.wal = weClient.renderInfo.view.wal
                              break;
                            default:
                              throw new Error("Unknown entry type:"+weClient.renderInfo.view.recordInfo.entryType);
                          }
                          break;
                        default:
                          throw new Error("Unknown integrity zome:"+weClient.renderInfo.view.recordInfo.integrityZomeName);
                      }
                      break;
                    default:
                      throw new Error("Unknown role name:"+weClient.renderInfo.view.recordInfo.roleName);
                  }
                }
                break;
              default:
                throw new Error("Unsupported applet-view type");
            }
            break;
          case "cross-applet-view":
            switch (weClient.renderInfo.view.type) {
              case "main":
                // here comes your rendering logic for the cross-applet main view
                //break;
              case "block":
                //
                //break;
              default:
                throw new Error("Unknown cross-applet-view render type.")
            }
            break;
          default:
            throw new Error("Unknown render view type");
  
        }  
        const client = weClient.renderInfo.appletClient;
      //@ts-ignore
      this._howStore = new HowStore(weClient, client, "how")
        if (this.renderType == RenderType.Unit) this._howStore.pullUnits()
        else if (this.renderType == RenderType.Document) {
          await this._howStore.pullUnits()
          // @ts-ignore
          await this._howStore.pullDocument(this.wal.hrl[1])
        } 

        //@ts-ignore
        const profilesClient = weClient.renderInfo.profilesClient;
        this._profilesStore = new ProfilesStore(profilesClient, config)
      }

    this.loaded = true;
  }


  render() {
    if (!this.loaded) return html`<span>Loading...</span>`;
    return html`
      <profile-prompt>
        ${this.renderType == RenderType.App ? html`
         <how-controller></how-controller>`:""}
        ${this.renderType == RenderType.Unit && this.wal ? html`
         <how-unit .currentUnitEh=${encodeHashToBase64(this.wal.hrl[1])}></how-unit>`:""}
        ${this.renderType == RenderType.Document && this.wal ? html`
         <how-document .currentDocumentEh=${encodeHashToBase64(this.wal.hrl[1])}></how-document>`:""}
      </profile-prompt>
                  <!-- <how-controller id="controller" dummy="{true}""></how-controller> -->

    `;
  }

  static get scopedElements() {
    return {
      "how-controller": HowController,
      "how-unit": HowUnit,
      "how-document": HowDocument,
    };
  }
}
