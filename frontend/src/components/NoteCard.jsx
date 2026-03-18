import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { Link } from "react-router"
import { formatDate } from '../lib/utils'
import api from '../lib/axios'
import toast from 'react-hot-toast'
//
import { useState } from 'react'

const NoteCard = ({note, setNotes}) => {
  /* Deletion just using the browser confir dialog */
  // const handleDelete = async (e, id) => {
  //   e.preventDefault();

  //   if(!window.confirm('Are you sure you want to delete this note?'))
  //     return;

  //   try {
  //     await api.delete(`/notes/${id}`);
  //     setNotes((prev) => prev.filter(note => note._id !== id)) //get rid of deleted note
  //     toast.success("Note deleted successfully!")
  //   } catch (error) {
  //     console.log('Error in handleDelete!', error)
  //     toast.error("Failed to delete note!")
  //   }

  /* Deletion by controlled modal using React state */
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Open modal instead of deleting directly
  const handleDelete = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    setShowModal(true);
  }

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await api.delete(`/notes/${selectedId}`);
      setNotes((prev) => prev.filter(note => note._id !== selectedId));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.log('Error in handleDelete!', error);
      toast.error("Failed to delete note!");
    } finally {
      setShowModal(false);
      setSelectedId(null);
    }

  }

  return (
    <>
      <Link to={`/note/${note._id}`} 
      className="card bg-base-100 hover:shadow-lg transition-all duration-200 
      border-t-4 border-solid border-[#00FF9D]">
        <div className="card-body">
          <h3 className="card-title text-base-content" >{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4" >
            <span className="text-sm text-base-content/60">
              {formatDate(note.createdAt)}
            </span>
            <div className="flex items-center gap-1">
              <PenSquareIcon className='size-4' />
              <button onClick={(e) => handleDelete(e, note._id)} className='btn btn-ghost btn-xs text-error' >
                <Trash2Icon className='size-4' />
              </button>
            </div>
          </div>
        </div>
      </Link>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">
              Are you sure you want to delete this note?
            </p>
            <div className="modal-action">
              <button className="btn btn-error" onClick={confirmDelete}>
                Delete
              </button>
              <button className="btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}  
        
    </>
  )
}

export default NoteCard