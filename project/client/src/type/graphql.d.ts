export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Folder = {
  __typename?: 'Folder';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  notes: Array<Note>;
};

export type Mutation = {
  __typename?: 'Mutation';
  CreateNote: Note;
};


export type MutationCreateNoteArgs = {
  content: Scalars['String']['input'];
  folderId: Scalars['ID']['input'];
};

export type Note = {
  __typename?: 'Note';
  _id: Scalars['ID']['output'];
  content: Scalars['String']['output'];
  folderId: Scalars['ID']['output'];
};

export type Query = {
  __typename?: 'Query';
  folder: Array<Folder>;
  folderId: Folder;
  noteId: Note;
  notes: Array<Maybe<Note>>;
};


export type QueryFolderIdArgs = {
  folderId: Scalars['String']['input'];
};


export type QueryNoteIdArgs = {
  noteId: Scalars['String']['input'];
};


export type QueryNotesArgs = {
  folderId: Scalars['String']['input'];
};
