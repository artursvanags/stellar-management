import { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Filaments',
}

async function getFilament() {
    try {
      const response = await fetch(
        'http://localhost:8000/api/filaments/?format=json',
        { cache: 'no-cache' }
      );
      const data = await response.json(); // Parse response to JSON
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

export default async function FilamentTable() {
    const filament_detail = await getFilament(); 



    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Token</th>
                    <th>Name</th>
                    <th>Color</th>
                </tr>
            </thead>
            <tbody>
            {filament_detail?.map((filament: any) => (
                <tr key={filament.id}>
                    <td>{filament.token}</td>
                    <td>{filament.name}</td>
                    <td>{filament.color}</td> {/* Added missing column */}
                </tr>
            ))}
            </tbody>
        </table>
    </div>
    );
}