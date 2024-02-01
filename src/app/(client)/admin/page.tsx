import Admin from "@/src/components/admin/Admin";
import NotAdmin from "@/src/components/admin/not-admin/NotAdmin";
import { auth } from "@clerk/nextjs";

const page = () => {
  const { userId } = auth();

  // console.log("userId--->", userId);

  return (
    <>
      {userId === process.env.DEVELOPER_ID_SAHIL ||
      userId === process.env.DEVELOPER_ID_PARAG ||
      userId === process.env.ADMIN_ID_TRIPUSERS ? (
        <Admin />
      ) : (
        <NotAdmin />
      )}
    </>
  );
};

export default page;
