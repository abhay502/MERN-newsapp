import './style.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { setLogout } from '../state';
import axios from 'axios';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { IMG_URL } from '../Constants';
import { Modal } from "react-bootstrap"; // Import Bootstrap's Modal component
import { useState } from 'react';
const Navbar = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    const [showModal, setShowModal] = useState(false);
    const [heading, setHeading] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");

    // Function to handle opening and closing the modal
    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    // Function to handle form submission when the modal is submitted
    const handleModalSubmit = async () => {
       
        // console.log(content,heading,image)
        if(content  && heading ){ 
            const formData = new FormData();   
            formData.append("userId",user?._id)
            formData.append("heading", heading);
            formData.append("content", content);
            if(image){
            formData.append("picturePath", image?.name);
            }
            formData.append("picture", image);
           
       
            try { 
              const response = await axios.post("http://localhost:3001/auth/addnews", formData);
          
              console.log(response);
              if (response.status === 200) {
                navigate('/home')
              }
            } catch (error) {
              console.log(error);
            }
          }
        setShowModal(false);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-4 fixed-top ">
                <div className="container-fluid pl-5">
                    <h2 className="fw-bold text-danger" onClick={() => navigate("/home")}>Buletin </h2>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <h2 className="text-end">‎ ‎ ‎ |‎ ‎ ‎ </h2>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 font-black">
                            <li className="nav-item">
                                <a className="nav-link " aria-current="page" href="/home">Stories</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/home">Creator</a>
                            </li>
                            <li className="nav-item">
                                <a href="/home" className="nav-link ">Community</a>
                            </li>
                            <li className="nav-item">
                                <a href="/home" className="nav-link ">Subscribe</a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0 font-black">

                                <li className="nav-link" onClick={handleModalOpen} style={{ cursor: "pointer" }} data-bs-toggle="tooltip" data-bs-placement="top" title="Add a news">
                                    <i className="far fa-pen-to-square"></i>
                                    <span className="icon-text-gap">write</span>
                                </li>

                                <li className="nav-link icon-text-gap">
                                    <i className="far fa-bell"></i>
                                </li>
                                <li className="nav-link icon-text-gap" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit profile">
                                    <img src={IMG_URL + user?.picturePath} onClick={() => navigate('/profile')} className="rounded-avatar" style={{ width: "35px", height: "35px" }} alt="ProfilePicture" />
                                   <span> {user ? user.userName : null}</span>
                                </li>

                                <li className="nav-link icon-text-gap" data-bs-toggle="tooltip" data-bs-placement="top" title="Click here to logout">
                                   
                                    {user ? <button onClick={() => dispatch(setLogout())} className='btn-secondary icon-text-gap'>Logout</button> : null}

                                </li>
                            </ul>



                        </div>
                    </div>
                </div>
            </nav>


            {/* Modal */}
            <Modal centered show={showModal}  onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='text-dark'>Add News📰 Page</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <form  >
                        <div className="form-group">
                            <label className='text-dark' htmlFor="modal-username ">Heading:</label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={(e) => setHeading(e.target.value)}
                                placeholder='write heading here....'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className='text-dark' htmlFor="modal-email ">Content:</label>
                            <input
                                type="email"
                                className="form-control"
                                onChange={(e) => setContent(e.target.value)}
                                placeholder='write content here....'
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className='text-dark' htmlFor="modal-email ">Image:</label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>
                        {/* Add more input fields as needed */}
                        <button type="button" onClick={handleModalSubmit} className="btn btn-primary">
                           Upload news
                        </button>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    )
}
export default Navbar;