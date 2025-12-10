import mongoose, { Schema, UpdateQuery } from "mongoose";
import { ITaskDocument, PLATFORMS, STATUSES } from "./types";

function handlePublishedAtUpdate(
  query: mongoose.Query<unknown, ITaskDocument>
): void {
  const update = query.getUpdate() as UpdateQuery<ITaskDocument> | null;
  if (!update) return;

  const newStatus = update.status || update.$set?.status;

  if (newStatus === "published") {
    if (update.$set) {
      update.$set.publishedAt = new Date();
    } else {
      query.set("publishedAt", new Date());
    }
  }
}

export const taskSchema = new Schema<ITaskDocument>(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    platform: {
      type: String,
      enum: {
        values: PLATFORMS,
        message: "{VALUE} is not a valid platform",
      },
      required: [true, "Platform is required"],
    },
    status: {
      type: String,
      enum: {
        values: STATUSES,
        message: "{VALUE} is not a valid status",
      },
      default: "draft",
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    price: {
      type: Number,
      default: 2.5,
      min: [0, "Price cannot be negative"],
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    discriminatorKey: "platform",
  }
);

taskSchema.pre(
  "findOneAndUpdate",
  { query: true, document: false },
  function () {
    handlePublishedAtUpdate(this as mongoose.Query<unknown, ITaskDocument>);
  }
);

taskSchema.pre("updateOne", { query: true, document: false }, function () {
  handlePublishedAtUpdate(this as mongoose.Query<unknown, ITaskDocument>);
});

taskSchema.pre("updateMany", { query: true, document: false }, function () {
  handlePublishedAtUpdate(this as mongoose.Query<unknown, ITaskDocument>);
});
