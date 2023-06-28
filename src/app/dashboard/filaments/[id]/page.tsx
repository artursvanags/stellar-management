import { Metadata } from "next";

async function getFilament(id: string) {
    const response = await fetch(
        `http://localhost:8000/api/filaments/${id}/?format=json`,
        { 
            next: {revalidate: 10 },
        }
    );

    const data = await response.json(); // Parse response to JSON
    return data;
}

export const metadata: Metadata = {
    title: "Music App",
    description: "Example music app using the components.",
  }

export default async function FilamentPage({params}: any) {
    const filament_detail = await getFilament(params.id);
    
    return (
        <div>
            <h1>{filament_detail.manufacturer}</h1>
            <h2>{filament_detail.color}</h2>
        </div>
    )

}
