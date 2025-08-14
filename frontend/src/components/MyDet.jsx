import { useEffect, useState } from "react";

export default function MyDetail() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // stored after login
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
  }, []);

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
        <div className="mb-2">
          <span className="font-bold">Name:</span> {user.name}
        </div>
        <div>
          <span className="font-bold">Email:</span> {user.email}
        </div>
      </div>
    </div>
  );
}
