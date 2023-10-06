import { extendType, idArg, nonNull, objectType, stringArg } from 'nexus';
import NoteModel from '../models/NoteModel';
export const NoteType = objectType({
   name: 'Note',
   definition(t) {
      t.nonNull.id('_id');
      t.nonNull.id('folderId');
      t.nonNull.string('content');
   },
});

export const NoteQuery = extendType({
   type: 'Query',
   definition(t) {
      t.nonNull.field('noteId', {
         type: 'Note',
         args: {
            noteId: nonNull(stringArg()),
         },
         resolve: async (_parent, args, _context, _info) => {
            const { noteId } = args;

            const res = await NoteModel.findOne({
               _id: noteId,
            });
            console.log('❄️ ~ file: Note.ts:27 ~ res:', res);
            return res;
         },
      });
      t.nonNull.list.field('notes', {
         type: 'Note',
         args: {
            folderId: nonNull(stringArg()),
         },
         resolve: async (_parent, args, _context, _info) => {
            const { folderId } = args;
            const data = await NoteModel.find({
               folderId,
            });

            return data;
         },
      });
   },
});

export const NoteMutation = extendType({
   type: 'Mutation',
   definition(t) {
      {
         t.nonNull.field('CreateNote', {
            type: 'Note',
            args: {
               folderId: nonNull(idArg()),
               content: nonNull(stringArg()),
            },
            resolve: async (parent, args, context, _info) => {
               console.log('❄️ ~ file: Note.ts:57 ~ parent:', parent);

               const res = new NoteModel({ ...args });
               await res.save();
               return res;
            },
         });
      }
   },
});
