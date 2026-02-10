type AvatarProps = {
  src?: string
  alt: string
}

export default function Avatar({ src, alt }: AvatarProps) {
  if (!src) {
    // If no src, use a placeholder avatar
    return (
      <div
        className="h-5 w-5 rounded-full bg-brand-purple"
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <img src={src} alt={alt} className="h-5 w-5 rounded-full object-cover" />
  )
}
