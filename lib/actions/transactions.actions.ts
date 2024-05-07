"use server";
import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../appwrite";
import { channel } from "diagnostics_channel";
import { parseStringify } from "../utils";
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
  APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,
} = process.env;

export const createTransaction = async (
  transaction: CreateTransactionProps
) => {
  try {
    const { database } = await createAdminClient();

    const newTransaction = await database.createDocument(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      ID.unique(),
      {
        channel: "online",
        category: "transfer",
        ...transaction,
      }
    );
    return parseStringify(newTransaction);
  } catch (error) {
    console.log("Error in create Transaction");
  }
};

export const getTransactionsByBankId = async ({
  bankId,
}: getTransactionsByBankIdProps) => {
  try {
    const { database } = await createAdminClient();

    const senderTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("senderBankId", bankId)]
    );
    const recieverTransactions = await database.listDocuments(
      DATABASE_ID!,
      TRANSACTION_COLLECTION_ID!,
      [Query.equal("recieverBankId", bankId)]
    );

    const transactions = {
      total: senderTransactions.total + recieverTransactions.total,
      documents: [
        ...senderTransactions.documents,
        ...recieverTransactions.documents,
      ],
    };

    return parseStringify(transactions);
  } catch (error) {
    console.log("Error in getTransactionsByBankId");
  }
};