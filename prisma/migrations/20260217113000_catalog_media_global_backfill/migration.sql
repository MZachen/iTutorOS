-- One-time backfill:
-- Create global (unassociated) media library rows for any existing active
-- associated CatalogMedia rows so media remains available even if the
-- associated product/service/subject/topic is later archived or deleted.

WITH associated_media AS (
  SELECT DISTINCT ON (cm.organization_id, cm.media_url, cm.media_type)
    cm.organization_id,
    cm.media_url,
    cm.media_type,
    cm.caption_text,
    cm.sort_order
  FROM "CatalogMedia" cm
  WHERE
    cm.archived_at IS NULL
    AND (
      cm.product_id IS NOT NULL
      OR cm.subject_id IS NOT NULL
      OR cm.topic_id IS NOT NULL
      OR cm.service_code IS NOT NULL
    )
  ORDER BY
    cm.organization_id,
    cm.media_url,
    cm.media_type,
    cm.created_at ASC
),
missing_global_rows AS (
  SELECT a.*
  FROM associated_media a
  LEFT JOIN "CatalogMedia" g
    ON g.organization_id = a.organization_id
   AND g.media_url = a.media_url
   AND g.media_type = a.media_type
   AND g.product_id IS NULL
   AND g.subject_id IS NULL
   AND g.topic_id IS NULL
   AND g.service_code IS NULL
   AND g.archived_at IS NULL
  WHERE g.id IS NULL
)
INSERT INTO "CatalogMedia" (
  id,
  organization_id,
  product_id,
  subject_id,
  topic_id,
  service_code,
  media_type,
  media_url,
  caption_text,
  sort_order,
  created_at,
  updated_at,
  archived_at
)
SELECT
  gen_random_uuid(),
  m.organization_id,
  NULL,
  NULL,
  NULL,
  NULL,
  m.media_type,
  m.media_url,
  m.caption_text,
  m.sort_order,
  now(),
  now(),
  NULL
FROM missing_global_rows m;
