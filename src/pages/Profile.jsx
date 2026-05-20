import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconBookmark } from "../components/Icons.jsx";
import { useApp } from "../context/AppContext.jsx";

const PROFILE = {
  name: "Alexander Smith",
  bio: "Savannah, Georgia · they/them",
  avatar: "https://i.pravatar.cc/150?img=11",
  cover: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  friends: 428,
  photos: 156,
};

const PROFILE_TABS = [
  { key: "posts", label: "Posts" },
  { key: "reels", label: "Reels" },
  { key: "marketplace", label: "Marketplace" },
  { key: "saved", label: "Saved" },
];

export function Profile() {
  const navigate = useNavigate();
  const { savedPostRecords, formatSavedTime } = useApp();
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <main className="profile-page">
      <div className="profile-cover">
        <img src={PROFILE.cover} alt="" className="profile-cover-img" />
      </div>

      <div className="profile-header-block">
        <img className="profile-avatar" src={PROFILE.avatar} alt="" width={88} height={88} />
        <h1 className="profile-name">{PROFILE.name}</h1>
        <p className="profile-bio">{PROFILE.bio}</p>

        <div className="profile-stats">
          <div className="profile-stat">
            <span className="profile-stat-value">{PROFILE.friends}</span>
            <span className="profile-stat-label">Friends</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{PROFILE.photos}</span>
            <span className="profile-stat-label">Photos</span>
          </div>
        </div>

        <div className="profile-actions">
          <button type="button" className="btn-primary profile-edit-btn">
            Edit profile
          </button>
          <button type="button" className="profile-secondary-btn">
            Add to story
          </button>
        </div>
      </div>

      <div className="profile-tabs" role="tablist" aria-label="Profile sections">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={`profile-tab${activeTab === tab.key ? " active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "posts" && (
        <section className="profile-section" aria-labelledby="profile-about-heading">
          <h2 id="profile-about-heading" className="profile-section-title">
            About
          </h2>
          <p className="profile-about-text">
            Outdoor enthusiast in the Lowcountry. Usually on the trail, at the farmers market, or planning the
            next kayak trip.
          </p>
        </section>
      )}

      {activeTab === "reels" && (
        <section className="profile-section">
          <p className="profile-empty-tab">No reels to show yet.</p>
        </section>
      )}

      {activeTab === "marketplace" && (
        <section className="profile-section">
          <p className="profile-empty-tab">No marketplace listings yet.</p>
        </section>
      )}

      {activeTab === "saved" && (
        <section className="profile-section profile-saved-section" aria-labelledby="profile-saved-heading">
          <h2 id="profile-saved-heading" className="profile-section-title">
            Saved
          </h2>
          {savedPostRecords.length === 0 ? (
            <p className="saved-empty-hint profile-saved-empty">
              Posts you save from your feed will appear here.
            </p>
          ) : (
            <ul className="profile-saved-list">
              {savedPostRecords.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    className="profile-saved-card"
                    onClick={() => navigate(`/saved/${s.id}`, { state: { from: "/profile" } })}
                  >
                    <span className="profile-saved-icon" aria-hidden>
                      <IconBookmark />
                    </span>
                    <span className="profile-saved-body">
                      <span className="profile-saved-title">{s.title}</span>
                      <span className="profile-saved-meta">
                        {s.meta
                          ? `${formatSavedTime(s.savedAt)} · ${s.meta}`
                          : formatSavedTime(s.savedAt)}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </main>
  );
}
