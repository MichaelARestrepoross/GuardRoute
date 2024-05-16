const Modal = ({ isOpen, onCancel }) => {

  const centralParkMap = "https://res.cloudinary.com/dm8xhvx4t/image/upload/v1714950060/centralParkMap_fferbt.jpg"

    return (
        isOpen && (
        <div className="flex justify-center items-center modal">
            <div className="flex justify-center items-center bg-mint/50 rounded-xl mx-10 my-10 shadow-2xl  backdrop-brightness-150 backdrop-blur-lg bg-opacity-70 p-5 h-auto w-auto">
              <div className="grid grid-cols-1 h-full w-full">
                {/* <div className="modal-content"> */}
                    <header className="modal-header">
                        <button className="bg-black/80 hover:text-red text-white font-bold py-2 px-4 rounded-xl inline-block text-3xl" style={{ fontFamily: 'Courier'}} onClick={onCancel}>&times;</button>
                    </header>
                    <img className="h-auto w-auto max-w-[80vw] max-h-[80vh] py-10" src={centralParkMap} alt="SquirrelMap"/>
                    <br/>
                </div>
            </div>
        </div>
        )
    );
}

export default Modal;