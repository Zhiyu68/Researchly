import axios from "axios";
import { cookies } from "next/headers";

export async function getUser() {
  try {
    const token = cookies().get("token");

    const response = await axios.get(
      "http://localhost:3000/api/users/currentuser",
      {
        headers: { Cookie: `token=${token?.value} ` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const user: any = await getUser();
  // const [user, setUser] = useState(null);

  // const getUser = async () => {
  //   try {
  //     const response = await axios.get("/api/users/currentuser");
  //     setUser(response.data.data);
  //   } catch (error: any) {
  //     message.error(error.response.data.message || error.message);
  //   }
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
