/**
 * Verification state of a Contextual Tokum Instance.
 *
 * These states describe the epistemic status of an assertion.
 * They must not be interpreted as simple boolean truth values.
 */
export type VerificationStatus =
  | "Verified"
  | "Unverified"
  | "Rejected"
  | "Pending";

/**
 * A Contextual Tokum Instance (CTI).
 *
 * This is intentionally minimal at the bootstrap stage.
 * Required protocol fields will be added as their semantics
 * are formally specified.
 */
export interface ContextualTokumInstance {
  readonly id: string;
  readonly proposition: string;
  readonly observer: string;
  readonly context: string;
  readonly observedAt: string;
  readonly verificationStatus: VerificationStatus;
}
