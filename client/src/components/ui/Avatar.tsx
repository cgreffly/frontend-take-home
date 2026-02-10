import { useState } from 'react'

type AvatarProps = {
  src?: string
  alt: string
}

function Fallback({ alt }: { alt: string }) {
  return (
    <div
      className="h-5 w-5 rounded-full bg-brand-purple"
      role="img"
      aria-label={alt}
    />
  )
}

export default function Avatar({ src, alt }: AvatarProps) {
  const [errored, setErrored] = useState(false)

  if (!src || errored) {
    return <Fallback alt={alt} />
  }

  return (
    <img
      src={src}
      alt={alt}
      className="h-5 w-5 rounded-full object-cover"
      onError={() => setErrored(true)}
    />
  )
}
