import React from 'react';
import '../../styles/mobile-field-emergency.css';

/**
 * Photo in the gallery.
 */
export interface GalleryPhoto {
  /** Photo ID. */
  id: string;
  /** Image URL or data URL. */
  src: string;
  /** Caption. */
  caption?: string;
  /** Timestamp. */
  capturedAt?: string;
  /** Geotag. */
  geotag?: { lat: number; lng: number };
}

/**
 * Props for FieldPhotoGallery.
 */
export interface FieldPhotoGalleryProps {
  /** Photos to display. */
  photos: GalleryPhoto[];
  /** Photo tap handler. */
  onPhotoPress?: (photo: GalleryPhoto) => void;
  /** Photo delete handler. */
  onPhotoDelete?: (photoId: string) => void;
  /** Layout mode. */
  layout?: 'grid' | 'list' | 'carousel';
  /** Empty message. */
  emptyMessage?: string;
  /** Additional className. */
  className?: string;
  /** Test id. */
  testId?: string;
}

/**
 * FieldPhotoGallery — photo gallery.
 *
 * Displays captured photos in grid, list, or carousel layout.
 * Grid mode shows thumbnails; list mode shows details with captions.
 * Carousel enables swipe-through for evidence review.
 * Geotag badge indicates GPS-tagged photos.
 */
export const FieldPhotoGallery: React.FC<FieldPhotoGalleryProps> = ({
  photos,
  onPhotoPress,
  onPhotoDelete,
  layout = 'grid',
  emptyMessage = 'No photos',
  className = '',
  testId,
}) => {
  if (photos.length === 0) {
    return (
      <div
        data-testid={testId}
        className={['tf-photo-gallery', 'tf-photo-gallery--empty', className].join(' ')}
        role="status"
      >
        <span className="tf-photo-gallery__empty">{emptyMessage}</span>
      </div>
    );
  }

  const layoutClass = `tf-photo-gallery--${layout}`;

  return (
    <div
      data-testid={testId}
      className={['tf-photo-gallery', layoutClass, className].join(' ')}
    >
      {layout === 'grid' && (
        <div className="tf-photo-gallery__grid">
          {photos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              className="tf-photo-gallery__thumb"
              onClick={() => onPhotoPress?.(photo)}
              aria-label={photo.caption || 'Photo'}
            >
              <img
                src={photo.src}
                alt={photo.caption || ''}
                className="tf-photo-gallery__img"
                loading="lazy"
              />
              {photo.geotag && (
                <span className="tf-photo-gallery__geotag" aria-label="Geotagged">
                  📍
                </span>
              )}
              {onPhotoDelete && (
                <button
                  type="button"
                  className="tf-photo-gallery__delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    onPhotoDelete(photo.id);
                  }}
                  aria-label="Delete photo"
                >
                  ✕
                </button>
              )}
            </button>
          ))}
        </div>
      )}

      {layout === 'list' && (
        <ul className="tf-photo-gallery__list" role="list">
          {photos.map((photo) => (
            <li key={photo.id} className="tf-photo-gallery__list-item">
              <img
                src={photo.src}
                alt={photo.caption || ''}
                className="tf-photo-gallery__list-img"
                loading="lazy"
              />
              <div className="tf-photo-gallery__list-info">
                {photo.caption && (
                  <span className="tf-photo-gallery__caption">{photo.caption}</span>
                )}
                {photo.capturedAt && (
                  <time dateTime={photo.capturedAt}>{photo.capturedAt}</time>
                )}
                {photo.geotag && (
                  <span className="tf-photo-gallery__coords">
                    {photo.geotag.lat.toFixed(5)}, {photo.geotag.lng.toFixed(5)}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}

      {layout === 'carousel' && (
        <div className="tf-photo-gallery__carousel">
          {photos.map((photo) => (
            <div key={photo.id} className="tf-photo-gallery__slide">
              <img
                src={photo.src}
                alt={photo.caption || ''}
                className="tf-photo-gallery__slide-img"
              />
              {photo.caption && (
                <span className="tf-photo-gallery__slide-caption">
                  {photo.caption}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

FieldPhotoGallery.displayName = 'FieldPhotoGallery';

export default FieldPhotoGallery;
