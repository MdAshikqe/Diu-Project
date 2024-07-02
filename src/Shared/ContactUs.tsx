import React from "react";
import Swal from "sweetalert2";

const ContactUs = () => {
  const handdle = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `Thanks for contacting us`,
      showConfirmButton: false,
      timer: 1900,
    });
  };
  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content ">
          <div className="card w-full max-w-sm">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Subject</span>
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="input input-bordered"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                  required
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button onClick={handdle} className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
