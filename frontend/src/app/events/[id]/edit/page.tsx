type Param = {
  params: {
    id: string;
  }
}

export default function EditEventPage({ params }: Param) {

  return (
    <main>
      Edit Event Page - Event ID {params.id}
    </main>
  )
}