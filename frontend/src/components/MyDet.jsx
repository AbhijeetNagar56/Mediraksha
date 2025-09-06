


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router";

// export default function MyDetail() {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = localStorage.getItem("token"); // stored after login
//         if (!token) {
//           navigate("/auth"); // redirect to login if no token
//           return;
//         }

//         const res = await fetch("http://localhost:5000/api/dashBoard", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await res.json();
//         if (res.ok) {
//           setUser(data);
//         } else {
//           console.error(data.msg || "Error fetching user details");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem("token"); // remove token
//     navigate("/"); // go to login page
//   };

//   const goHome = () => {
//     navigate("/"); // navigate to home page
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <span className="loading loading-spinner loading-lg text-primary"></span>
//       </div>
//     );
//   }

//   if (!user) {
//     return <div className="text-center text-red-500 mt-10">No user found</div>;
//   }

//   return (
//     <div className="flex justify-center items-center h-screen bg-base-200">
//       <div className="card w-96 bg-base-100 shadow-xl p-5">
//         <h2 className="text-2xl font-bold text-center mb-4">My Details</h2>
//         <div className="mb-4">
//           <span className="font-bold">Name:</span> {user.name}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold">Email:</span> {user.email}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold">Gender:</span> {user.gender}
//         </div>
//         <div className="mb-4">
//           <span className="font-bold">Age:</span> {user.age}
//         </div>

//         <div className="flex gap-3">
//           <button
//             className="btn btn-primary flex-1"
//             onClick={goHome}
//           >
//              Back
//           </button>
//           <button
//             className="btn btn-error flex-1"
//             onClick={handleLogout}
//           >
//              Logout
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function MyDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false); // ✨ State for edit mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/auth");
          return;
        }

        const res = await fetch("http://localhost:5000/api/dashBoard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setUser(data);
          setFormData({
            name: data.name || "",
            email: data.email || "",
            gender: data.gender || "",
            age: data.age || ""
          });
        } else {
          console.error(data.msg || "Error fetching user details");
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goHome = () => {
    navigate("/");
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/dashBoard/update", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          gender: formData.gender,
          age: formData.age,
          name: formData.name, // optional: allow name editing too
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Details updated successfully!");
        setUser(data.user); // Updated user from server
        setEditing(false);
      } else {
        console.error(data.msg || "Error updating details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!user) {
    return <div className="text-center text-red-500 mt-10">No user found</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-5">
        <h2 className="text-2xl font-bold text-center mb-4">My Details</h2>

        {editing ? (
          <>
            {/* Editable Form */}
            <div className="mb-4">
              <label className="block mb-1 font-bold">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-bold">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled // don't allow editing email
                className="input input-bordered w-full"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-bold">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-bold">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-3">
              <button className="btn btn-success flex-1" onClick={handleSave}>
                Save
              </button>
              <button className="btn btn-secondary flex-1" onClick={handleEditToggle}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            {/* View Mode */}
            <div className="mb-4">
              <span className="font-bold">Name:</span> {user.name}
            </div>
            <div className="mb-4">
              <span className="font-bold">Email:</span> {user.email}
            </div>
            <div className="mb-4">
              <span className="font-bold">Gender:</span> {user.gender}
            </div>
            <div className="mb-4">
              <span className="font-bold">Age:</span> {user.age}
            </div>

            <div className="flex gap-3">
              <button className="btn btn-primary flex-1" onClick={goHome}>
                Back
              </button>
              <button className="btn btn-warning flex-1" onClick={handleEditToggle}>
                Edit
              </button>
              <button className="btn btn-error flex-1" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
