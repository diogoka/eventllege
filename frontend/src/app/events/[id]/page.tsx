type Param = {
  params: {
    id: string;
  }
}

export default function EventPage({ params }: Param) {

  return (
    <>
      Event Page - Event ID {params.id}
    </>
  )
}