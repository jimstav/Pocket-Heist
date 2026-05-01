// preview page for newly created UI components

import Skeleton from "@/components/Skeleton"
import Avatar from "@/components/Avatar"

export default function PreviewPage() {
  return (
    <div className="page-content">
      <h2>Preview</h2>
      <section>
        <h3>Skeleton</h3>
        <div className="preview-grid">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      </section>
      <section>
        <h3>Avatar</h3>
        <div className="preview-grid">
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Avatar name="James" />
            <Avatar name="JohnDoe" />
            <Avatar name="alice" />
            <Avatar name="PocketHeist" />
          </div>
        </div>
      </section>
    </div>
  )
}
