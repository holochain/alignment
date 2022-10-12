import { CellClient } from '@holochain-open-dev/cell-client';
import { EntryHashB64, AgentPubKeyB64 } from '@holochain-open-dev/core-types';
import { Unit, Signal, RustNode, RustTree, Initialization, DocumentOutput, DocumentInput, UpdateDocumentInput} from './types';
import { RecordBag, serializeHash } from '@holochain-open-dev/utils';

export class HowService {
  constructor(
    public cellClient: CellClient,
    protected zomeName = 'how'
  ) {}

  get myAgentPubKey() : AgentPubKeyB64 {
    return serializeHash(this.cellClient.cell.cell_id[1]);
  }

  async initialize(input: Initialization): Promise<EntryHashB64> {
    return this.callZome('initialize', input);
  }

  async createUnit(unit: Unit): Promise<EntryHashB64> {
    return this.callZome('create_unit', unit);
  }

  async getUnits(): Promise<RecordBag<Unit>> {
    const units = await this.callZome('get_units', null)
    return new RecordBag(units);
  }

  async createDocument(input: DocumentInput): Promise<EntryHashB64> {
    return this.callZome('create_document', input);
  }

  async updateDocument(input: UpdateDocumentInput): Promise<EntryHashB64> {
    return this.callZome('update_document', input);
  }

  async getDocuments(path: string): Promise<Array<DocumentOutput>> {
    return this.callZome('get_documents', path);
  }

  async getTree(): Promise<Array<RustNode>> {
    let tree:RustTree = await this.callZome('get_tree', null);
    return tree.tree
  }
  async notify(signal: Signal, folks: Array<AgentPubKeyB64>): Promise<void> {
    return this.callZome('notify', {signal, folks});
  }

  private callZome(fn_name: string, payload: any) {
    return this.cellClient.callZome(this.zomeName, fn_name, payload);
  }
}
