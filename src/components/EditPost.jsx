import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { formatFetch } from '../formatFetch'

const EditPost = ({ url, posts, setPosts, editTitle, setEditTitle, editContent, setEditContent, getFullDateTime, countEditContent }) => {
    const { id } = useParams()
    const nav = useNavigate()

    const fetchPost = async id => {
        const res = await fetch(formatFetch(url, id))
        const data = await res.json()
        setEditTitle(data.title)
        setEditContent(data.content)
    }

    useEffect(() => {
        (async () => await fetchPost(id))()
    }, [])

    const handleEdit = async e => {
        e.preventDefault()
        const newPosts = posts.map(post => post.id == id ? { id: parseInt(id), title: editTitle, content: editContent, datetime: getFullDateTime } : post)
        const activePost = newPosts.filter(post => post.id == id)
        setPosts(newPosts)
        nav(`/post/${id}`)

        await fetch(formatFetch(url, id), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activePost[0])
        })

        window.location.reload()
    }

    return (
        <form onSubmit={(e) => handleEdit(e)} className="new-post p-5">
            <h2>Edit Post</h2>
            <article className="flex flex-col gap-3 mt-5">
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" id="title" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} required />
                </div>
                <div className='relative'>
                    <label htmlFor="content">Post:</label>
                    <p className="absolute top-0 right-0 text-sm">{countEditContent}</p>
                    <textarea id="content" value={editContent} onChange={(e) => setEditContent(e.target.value)} required ></textarea>
                </div>
                <button type="submit" className="btn trans">Edit</button>
            </article>
        </form>
    )
}

export default EditPost