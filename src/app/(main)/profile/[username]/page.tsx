import { UserProfileComponent } from "@/features/user/components"


type PageProps = {
    params: Promise<{ username: string }>;
}

const Page = async ({ params }: PageProps) => {
  const { username } = await params

  return <UserProfileComponent username={username} />
}

export default Page