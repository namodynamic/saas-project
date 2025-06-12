import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center min-h-screen items-center">
      <SignUp />
    </main>
  );
}
