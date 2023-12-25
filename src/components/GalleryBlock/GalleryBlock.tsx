//styles
import styles from "./styles.module.scss"
//libs
import { useState, useEffect } from "react"
import { toast } from 'sonner';
//components
import GalleryCard from "./GalleryCard/GalleryCard"
import Button from "components/UI/Button/Button"
import Skeleton from "components/UI/Skeleton/Skeleton"
import ImageViewer from "components/ImageViewer/ImageViewer";
//redux
import { useGetImagesQuery } from "reduxFolder/api/users/slice"
//types
import { GetPhotosResponse } from "reduxFolder/api/users/types/GetImages"

const GalleryBlock = () => {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, isError } = useGetImagesQuery({ page, order_by: "latest", per_page: 15 })
  const [allData, setAllData] = useState<GetPhotosResponse>([])
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [pickedImageIndex, setPickedImageIndex] = useState<number | null>(null)

  useEffect(() => {
    if (data) setAllData(prev => [...prev, ...data])
  }, [data])

  const preloader = isLoading || isError ?
    (new Array(15).fill(null).map((_, i) => (
      <Skeleton key={i} className={styles.skeletonCard}>
        <Skeleton className={styles.skeletonImage} />
        <Skeleton className={styles.skeletonName} />
        <Skeleton className={styles.skeletonAuthor} />
      </Skeleton>
    )))
    : null

  const onCardClick = (i: number) => {
    setIsViewerOpen(true)
    setPickedImageIndex(i)

  }

  const content = data && !isError && !isLoading ?
    allData.map((image, i) => <GalleryCard onClick={() => onCardClick(i)} key={image.id + i} {...image} />)
    : null

  useEffect(() => {
    if (isError) {
      toast('Oops, something went wrong (images)', {
        position: 'top-right',
        duration: 4000
      })
    }
  }, [isError])

  return (
    <>
      <div id="gallery" className={styles.container}>
        <h1 className={styles.title}>
          Agora Software Gallery
        </h1>
        <div className={styles.cardsList}>
          {content}
          {preloader}
        </div>
        {
          data &&
          <Button isLoading={isFetching || isLoading} onClick={() => setPage(page + 1)}>
            Show more
          </Button>
        }
      </div>
      {
        allData && isViewerOpen &&
        <ImageViewer
          isModalOpen={isViewerOpen}
          onClose={() => {
            setIsViewerOpen(false)
            setPickedImageIndex(null)
          }}
          startFrom={pickedImageIndex || 0}
          firstMount={false}
          images={allData} />
      }
    </>
  )
}

export default GalleryBlock