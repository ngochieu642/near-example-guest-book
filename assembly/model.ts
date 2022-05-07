import {context, u128, PersistentVector, logging} from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen
export class PostedMessage {
  premium: boolean;
  sender: string;
  amount: u128;
  specificAmount: u128;

  constructor(public text: string) {
    logging.log("Attach Deposit: " + context.attachedDeposit.toString());
    logging.log("Context sender: " + context.sender);
    logging.log("Context predecessor: " + context.predecessor);
    logging.log("Contract balance: " + asNEAR(context.accountBalance).toString());
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
    this.amount = asNEAR(context.attachedDeposit);
    this.specificAmount = context.attachedDeposit;
  }
}

function asNEAR(amount: u128): u128 {
  const ONE_NEAR = u128.from('1000000000000000000000000');
  const result = u128.div(amount, ONE_NEAR)
  logging.log("Amount equals to: " + result.toString() + " NEAR");
  return result;
}

/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");
