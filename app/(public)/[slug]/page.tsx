import { BusinessCard } from "./_components/BusinessCard";

export default function page(){
    return (
        <div>
            <BusinessCard 
            name="Bobs Burgers" 
            address="123 Bob St" 
            phone="1234" 
            email="matt@gmail.com"
            description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti, esse."
            suburb="Glenfield"
            />

            
        </div>
    )
}