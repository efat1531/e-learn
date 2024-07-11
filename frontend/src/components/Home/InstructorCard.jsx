import React from "react";
import { numberToEnFormat } from "../../utils/Transformations";
import { Link } from "react-router-dom";

const rating = 5;
const count = 2759;
const description = `student${count < 2 ? "" : "s"}`;
const imageURL =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/f50fdda79c58e6003124c096bb51d2502f636c820f1fbd1bda8c0089e11a7df7?apiKey=23afa202bc2b43d8bffafdcae0891485&";
const name = "Mahadi Ahmed";
const title = "English Lecturer";

const InstructorCard = () => {
  const formattedCount = numberToEnFormat(count);
  const slug = name.toLowerCase().replace(" ", "-");

  return (
    <Link to={`/instructor/${slug}`} style={{ textDecoration: "none" }}>
      <section style={style.profileCard}>
        <img
          loading="lazy"
          src={imageURL}
          style={style.profileImage}
          alt={`Profile picture of ${name}`}
        />
        <div style={style.profileInfo}>
          <h2 style={style.profileName}>{name}</h2>
          <p style={style.profileTitle}>{title}</p>
        </div>
        <hr style={style.divider} />
        <div style={style.profileDetails}>
          <div style={style.rating}>
            ⭐ <div>{rating}</div>
          </div>
          <div style={style.stats}>
            <div style={style.statsCount}>{formattedCount}</div>
            <div style={style.statsDescription}>&nbsp;{description}</div>
          </div>
        </div>
      </section>
    </Link>
  );
};

export default InstructorCard;

const style = {
  profileCard: {
    paddingBottom: "0.75rem",
    justifyContent: "center",
    border: "0.0625rem solid rgba(233, 234, 240, 1)",
    backgroundColor: "#fff", // Assuming var(--Gray-White, #fff) is #fff
    display: "flex",
    maxWidth: "15.25rem",
    flexDirection: "column",
    transition: "all 0.2s ease-in-out",
    cursor: "pointer",
  },
  profileImage: {
    aspectRatio: "auto",
    objectFit: "auto",
    objectPosition: "center",
    width: "100%",
    boxShadow: "0rem -0.0625rem 0rem 0rem #e9eaf0 inset",
  },
  profileInfo: {
    alignSelf: "center",
    display: "flex",
    marginTop: "0.75rem",
    flexDirection: "column",
    textAlign: "center",
    padding: "0 1.25rem",
  },
  profileName: {
    color: "#1d2026", // Assuming var(--Gray-900, #1d2026) is #1d2026
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.375rem",
    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
  },
  profileTitle: {
    color: "#8c94a3", // Assuming var(--Gray-500, #8c94a3) is #8c94a3
    letterSpacing: "-0.00875rem",
    marginTop: "0.25rem",
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.4375rem",
    fontFamily: "Inter, -apple-system, Roboto, Helvetica, sans-serif",
  },
  divider: {
    border: "0.0625rem solid rgba(233, 234, 240, 1)",
    backgroundColor: "#e9eaf0",
    minHeight: "0.0625rem",
    marginTop: "0.6875rem",
    width: "100%",
  },
  profileDetails: {
    justifyContent: "space-between",
    display: "flex",
    marginTop: "0.75rem",
    width: "100%",
    gap: "1.25rem",
    fontSize: "0.875rem",
    letterSpacing: "-0.00875rem",
    padding: "0 1rem",
  },
  rating: {
    alignSelf: "flex-start",
    display: "flex",
    gap: "0.3125rem",
    color: "#4e5566", // Assuming var(--Gray-700, #4e5566) is #4e5566
    fontWeight: "500",
    lineHeight: "1.4375rem",
    fontFamily: "Inter, sans-serif",
  },
  stats: {
    justifyContent: "center",
    display: "flex",
    gap: "0",
  },
  statsCount: {
    color: "#4e5566", // Assuming var(--Gray-700, #4e5566) is #4e5566
    fontWeight: "500",
    lineHeight: "1.4375rem",
    fontFamily: "Inter, sans-serif",
  },
  statsDescription: {
    color: "#8c94a3", // Assuming var(--Gray-500, #8c94a3) is #8c94a3
    fontWeight: "400",
    lineHeight: "1.4375rem",
    fontFamily: "Inter, sans-serif",
  },
};
