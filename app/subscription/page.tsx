import { PricingTable } from "@clerk/nextjs"

const Subscription = () => {
    return (
        <main className="flex justify-center min-h-screen items-center mx-auto px-14 flex-col gap-8 max-w-7xl py-30 max-sm:px-2">
            <PricingTable />
        </main>
    )
}
export default Subscription
