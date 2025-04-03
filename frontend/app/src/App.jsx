import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState()

  // Update handler to set state
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  // Function to upload the file to the backend
  const uploadFile = async () => {
    // Append image file to formData
    const formData = new FormData()
    formData.append('image', file)

    try {
      // Post image to backend server
      const res = await fetch('http://localhost:3000/fileupload', { method: 'POST', body: formData })

      // Error handling
      if (res.ok) {
        const json = await res.json()
        console.log('Response is: ', json)
      } else {
        throw new Error('Something went wrong')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <form className='form' onSubmit={uploadFile} method='post' encType='multipart/form-data'>
        <label>Upload file here</label>
        <input
          onChange={(e) => handleFileChange(e)}
          name='image'
          type='file'
          style={{ width: '200px', height: '100px' }}
        ></input>
      </form>
      <button onClick={uploadFile}>Submit </button>
    </>
  )
}

export default App
