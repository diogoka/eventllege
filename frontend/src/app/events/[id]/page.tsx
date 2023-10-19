type Param = {
  params: {
    id: string;
  }
}

export default function EventPage({ params }: Param) {

  return (
    <main>
      Event Page - Event ID {params.id}
    </main>
  )
}