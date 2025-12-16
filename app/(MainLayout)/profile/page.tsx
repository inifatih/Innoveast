import { getMyProfile } from "@/app/(MainLayout)/profile/action";
import ProfileEditable from "@/components/profile/ProfileEditable";

export default async function DataDiriPage() {
  const data = await getMyProfile();

  return (
    <div>
      <ProfileEditable data={data} />
    </div>
  );
}
