// components/TiptapEditor.tsx
'use client';

// Import Tipe Editor dari @tiptap/react
import { Toggle } from '@/components/ui/toggle';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
// Hapus 'Code' jika tidak digunakan, atau tambahkan ke Toolbar
import { Bold, Italic, List, ListOrdered } from 'lucide-react';
import { useEffect } from 'react';

// Definisikan tipe props
interface TiptapEditorProps {
  value: string; // Konten HTML saat ini
  onChange: (html: string) => void; // Handler perubahan
  editable?: boolean;
}

// --- Komponen Toolbar ---
// Beri tipe eksplisit pada prop 'editor'
interface TiptapToolbarProps {
    editor: Editor | null; // Gunakan tipe Editor yang diimpor
}

const TiptapToolbar = ({ editor }: TiptapToolbarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-t-md p-1 flex flex-wrap gap-1">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Toggle bullet list"
      >
        <List className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Toggle ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      {/* Anda bisa menambahkan lebih banyak kontrol di sini */}
    </div>
  );
};

// --- Komponen Editor Utama ---
export function TiptapEditor({ value, onChange, editable = true }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // ... konfigurasi
      }),
    ],
    content: value,
    editable: editable,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      // Panggil onChange handler dengan konten HTML yang diperbarui
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'min-h-[150px] max-h-[400px] overflow-y-auto w-full rounded-b-md border border-input p-4 prose focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring',
      },
    },
  });

  // Sinkronisasi Prop 'value' dari luar
  useEffect(() => {
    // Memastikan editor sudah terinisialisasi dan nilai yang masuk berbeda dengan yang ada di editor
    const isSame = editor?.getHTML() === value;

    if (editor && !isSame) {
        // 💥 PERBAIKAN: Gunakan objek { emitUpdate: true }
        // atau { focus: false } jika Anda ingin agar tidak fokus.
        // TipTap v2.x mengharuskan argumen kedua berupa objek opsi.
        editor.commands.setContent(value, { emitUpdate: false }); 
        // emitUpdate: false mencegah loop tak terbatas jika onChange tidak perlu dipanggil saat inisialisasi/reset
    }
  }, [value, editor]);

  return (
    <div className="w-full">
      <TiptapToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}