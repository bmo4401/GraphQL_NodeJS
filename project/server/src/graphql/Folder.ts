import { extendType, nonNull, objectType, stringArg } from 'nexus';
import { folders, notes } from '../../fake';
import FolderModel from '../models/FolderModel';
import NoteModel from '../models/NoteModel';
import { Context } from '../type/Context';
export const FolderType = objectType({
   name: 'Folder',
   definition(t) {
      t.nonNull.string('id'),
         t.nonNull.string('name'),
         t.nonNull.list.nonNull.field('notes', {
            type: 'Note',
            resolve: (parent, _args, _context, _info) => {
               return notes.filter((note) => note.folderId === parent.id);
            },
         });
   },
});

export const FolderQuery = extendType({
   type: 'Query',
   definition(t) {
      t.nonNull.list.nonNull.field('folder', {
         type: 'Folder',
         resolve: async (_parent, _args, context: Context, _info) => {
            const { uid } = context;
            const result = await FolderModel.find({ authorId: uid });
            console.log('❄️ ~ file: Folder.ts:28 ~ result:', result);

            return result;
         },
      });
      t.nonNull.field('folderId', {
         type: 'Folder',
         args: {
            folderId: nonNull(stringArg()),
         },
         resolve: async (_parent, args, _context, _info) => {
            const { folderId } = args;

            const res = await NoteModel.find({
               folderId,
            });
            return res;
         },
      });
   },
});
