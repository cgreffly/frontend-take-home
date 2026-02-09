type AvatarProps = {
  src: string
  alt: string
}

export default function Avatar({ src, alt }: AvatarProps) {
  return (
    <img src={src} alt={alt} className="h-5 w-5 rounded-full object-cover" />
  )
}
