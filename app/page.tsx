import Hero from "@/app/Hero";
import Nav from './nav'

export default async function Home() {
    return (
        <div className='bg-[rgb(36,36,36)] text-white h-screen snap-y snap-mandatory z-0'>
            <Nav/>
        </div>
        )
}

