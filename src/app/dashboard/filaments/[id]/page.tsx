const FilamentPage = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <h1>Filament {params.id}</h1>
    </div>
  );
};

export default FilamentPage;
