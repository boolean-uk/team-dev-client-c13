import { useState } from "react"
import useModal from "../../hooks/useModal"
import './style.css'
import Button from '../button'
import { createPost } from "../../service/apiClient"

const CreatePostModal = () => {
    // Use the useModal hook to get the closeModal function so we can close the modal on user interaction
    const { closeModal } = useModal()

    const [message, setMessage] = useState(null)
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = () => {
        setIsLoading(true)
        try {
            createPost(text)
                .then(() => {
                    setIsLoading(false)
                    closeModal()
                })
        } catch (e) {
            setIsLoading(false)
            setMessage(e.message)
        }
    }

    return (
        <>
            <section className="create-post-user-details">
                <div className="profile-icon"><p>AJ</p></div>
                <div className="post-user-name"><p>Alex J</p></div>
            </section>

            <section>
                <textarea onChange={onChange} value={text} placeholder="What's on your mind?"></textarea>
            </section>

            <section className="create-post-actions">
                <Button
                    onClick={onSubmit}
                    text='Post'
                    classes={`${text.length ? 'blue' : 'offwhite' } width-full`}
                    disabled={!text.length}
                />
            </section>

            {message && <p>{message}</p>}
        </>
      <>
        <section className="create-post-user-details">
          <div className="profile-icon">
            <p>{`${user.firstName[0]}${user.lastName[0]}`}</p>
          </div>
          <div className="post-user-name">
            <p>{user.firstName} {user.lastName}</p>
          </div>
        </section>

        <section>
          <textarea
            onChange={onChange}
            value={text}
            placeholder="What's on your mind?"
          ></textarea>
        </section>

        <section className="create-post-actions">
          <Button
            onClick={onSubmit}
            text='Post'
            classes={`${text.length ? 'blue' : 'offwhite' } width-full`}
            disabled={!text.length || isLoading}
            isLoading={isLoading}
          />
        </section>

        {message && <p>{message}</p>}
      </>
    )
}

export default CreatePostModal