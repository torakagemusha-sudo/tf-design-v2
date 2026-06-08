#pragma once

#include <array>
#include <cstdint>
#include <string_view>

namespace tfdesign {

// -----------------------------------------------------------------------------
// Runtime/UI state model ported from src/types/index.ts and src/utils/index.ts.
// This header is intentionally dependency-light and renderer-neutral.
// -----------------------------------------------------------------------------

enum class ComponentState : std::uint8_t {
    Idle,
    Ready,
    Dirty,
    Validating,
    Valid,
    Warning,
    Blocked,
    Staged,
    Running,
    Complete,
    Degraded,
    Faulted,
    Locked,
    Simulated,
    Committed,
    Deployed,
    Disconnected,
};

enum class AuthorityLevel : std::uint8_t {
    Observe = 0,
    Draft = 1,
    Stage = 2,
    Execute = 3,
    Commit = 4,
    Override = 5,
    Root = 6,
};

enum class CommandClass : std::uint8_t {
    Observe,
    Draft,
    Validate,
    Stage,
    Execute,
    Commit,
    Deploy,
    Control,
    Destructive,
    Authority,
};

enum class CommandState : std::uint8_t {
    Available,
    Disabled,
    Blocked,
    RequiresConfirmation,
    RequiresAuthority,
    Queued,
    Staged,
    Running,
    Complete,
    Failed,
};

enum class ComponentFamily : std::uint8_t {
    ActionCommand,
    FeedbackStatus,
    InputControl,
    Navigation,
    DataDisplay,
    Overlay,
    AuthorityPermission,
    AiModel,
    StreamLive,
    SafetyCircuit,
    TraceAudit,
    WorkspaceLayout,
};

enum class ComponentDensity : std::uint8_t {
    Compact,
    Standard,
    Field,
};

enum class ComponentCriticality : std::uint8_t {
    Passive,
    Informational,
    Operational,
    Warning,
    Critical,
    Audit,
};

struct Rgba8 {
    std::uint8_t r{};
    std::uint8_t g{};
    std::uint8_t b{};
    std::uint8_t a{255};

    [[nodiscard]] constexpr std::uint32_t packed_rgba() const noexcept {
        return (static_cast<std::uint32_t>(r) << 24u) |
               (static_cast<std::uint32_t>(g) << 16u) |
               (static_cast<std::uint32_t>(b) << 8u) |
               static_cast<std::uint32_t>(a);
    }

    friend constexpr bool operator==(const Rgba8&, const Rgba8&) = default;
};

struct ColourWord64 {
    std::uint16_t hue_id{};
    std::uint8_t saturation{255};
    std::uint8_t brightness{255};
    std::uint8_t alpha{255};
    std::uint8_t pattern_id{};
    std::uint8_t border_id{};
    std::uint8_t pulse_id{};

    [[nodiscard]] constexpr std::uint64_t packed() const noexcept {
        return (static_cast<std::uint64_t>(hue_id) << 48u) |
               (static_cast<std::uint64_t>(saturation) << 40u) |
               (static_cast<std::uint64_t>(brightness) << 32u) |
               (static_cast<std::uint64_t>(alpha) << 24u) |
               (static_cast<std::uint64_t>(pattern_id) << 16u) |
               (static_cast<std::uint64_t>(border_id) << 8u) |
               static_cast<std::uint64_t>(pulse_id);
    }
};

// Canonical colour tokens from src/styles/tokens.css.
inline constexpr Rgba8 Black{0x05, 0x06, 0x08, 0xFF};
inline constexpr Rgba8 Void{0x08, 0x0B, 0x0F, 0xFF};
inline constexpr Rgba8 Charcoal{0x0E, 0x13, 0x18, 0xFF};
inline constexpr Rgba8 Graphite{0x14, 0x1A, 0x20, 0xFF};
inline constexpr Rgba8 Panel{0x10, 0x16, 0x1C, 0xFF};
inline constexpr Rgba8 PanelRaised{0x17, 0x1F, 0x27, 0xFF};
inline constexpr Rgba8 PanelInset{0x09, 0x0D, 0x11, 0xFF};

inline constexpr Rgba8 Steel950{0x0A, 0x0E, 0x12, 0xFF};
inline constexpr Rgba8 Steel900{0x1A, 0x22, 0x2A, 0xFF};
inline constexpr Rgba8 Steel800{0x22, 0x2C, 0x35, 0xFF};
inline constexpr Rgba8 Steel700{0x2D, 0x3A, 0x45, 0xFF};
inline constexpr Rgba8 Steel600{0x40, 0x50, 0x5C, 0xFF};
inline constexpr Rgba8 Steel500{0x5F, 0x6E, 0x7A, 0xFF};
inline constexpr Rgba8 Steel400{0x7C, 0x8A, 0x95, 0xFF};
inline constexpr Rgba8 Steel300{0x9B, 0xAA, 0xB5, 0xFF};
inline constexpr Rgba8 Steel200{0xBC, 0xC8, 0xD0, 0xFF};
inline constexpr Rgba8 Steel100{0xD6, 0xE0, 0xE6, 0xFF};
inline constexpr Rgba8 White{0xF4, 0xF7, 0xF8, 0xFF};

inline constexpr Rgba8 Green{0x36, 0xD4, 0x7B, 0xFF};
inline constexpr Rgba8 GreenDim{0x1F, 0x7F, 0x4D, 0xFF};
inline constexpr Rgba8 GreenDark{0x0B, 0x1A, 0x12, 0xFF};
inline constexpr Rgba8 Red{0xF2, 0x4B, 0x4B, 0xFF};
inline constexpr Rgba8 RedDim{0x8F, 0x2C, 0x2C, 0xFF};
inline constexpr Rgba8 RedDark{0x1C, 0x0B, 0x0B, 0xFF};
inline constexpr Rgba8 RedCritical{0xB0, 0x00, 0x20, 0xFF};
inline constexpr Rgba8 Amber{0xF2, 0xB8, 0x4B, 0xFF};
inline constexpr Rgba8 AmberDim{0x9E, 0x6F, 0x24, 0xFF};
inline constexpr Rgba8 AmberDark{0x1D, 0x16, 0x08, 0xFF};
inline constexpr Rgba8 Orange{0xF0, 0x7A, 0x2A, 0xFF};
inline constexpr Rgba8 OrangeDim{0x98, 0x4B, 0x1A, 0xFF};
inline constexpr Rgba8 OrangeDark{0x1B, 0x0D, 0x05, 0xFF};
inline constexpr Rgba8 Blue{0x4B, 0xA3, 0xF2, 0xFF};
inline constexpr Rgba8 BlueDim{0x2D, 0x63, 0x94, 0xFF};
inline constexpr Rgba8 BlueDark{0x07, 0x11, 0x1F, 0xFF};
inline constexpr Rgba8 Cyan{0x35, 0xD0, 0xE3, 0xFF};
inline constexpr Rgba8 CyanDim{0x1B, 0x77, 0x83, 0xFF};
inline constexpr Rgba8 CyanDark{0x04, 0x14, 0x17, 0xFF};
inline constexpr Rgba8 Purple{0xA6, 0x78, 0xF2, 0xFF};
inline constexpr Rgba8 PurpleDim{0x5F, 0x4A, 0x8B, 0xFF};
inline constexpr Rgba8 PurpleDark{0x11, 0x0B, 0x1F, 0xFF};
inline constexpr Rgba8 Gold{0xD6, 0xA8, 0x4F, 0xFF};
inline constexpr Rgba8 GoldDim{0x8A, 0x6A, 0x30, 0xFF};
inline constexpr Rgba8 GoldDark{0x1A, 0x14, 0x07, 0xFF};
inline constexpr Rgba8 Slate{0x6E, 0x7F, 0x8D, 0xFF};
inline constexpr Rgba8 SlateDim{0x46, 0x53, 0x5D, 0xFF};
inline constexpr Rgba8 SlateDark{0x10, 0x16, 0x1B, 0xFF};

[[nodiscard]] constexpr Rgba8 state_colour(ComponentState state) noexcept {
    switch (state) {
        case ComponentState::Ready:
        case ComponentState::Valid:
        case ComponentState::Complete:
        case ComponentState::Committed:
        case ComponentState::Deployed:
            return Green;
        case ComponentState::Dirty:
        case ComponentState::Warning:
        case ComponentState::Staged:
            return Amber;
        case ComponentState::Blocked:
        case ComponentState::Faulted:
            return Red;
        case ComponentState::Validating:
        case ComponentState::Simulated:
            return Blue;
        case ComponentState::Running:
            return Cyan;
        case ComponentState::Degraded:
            return Orange;
        case ComponentState::Locked:
            return Gold;
        case ComponentState::Idle:
        case ComponentState::Disconnected:
        default:
            return Steel500;
    }
}

[[nodiscard]] constexpr Rgba8 state_background_colour(ComponentState state) noexcept {
    switch (state) {
        case ComponentState::Ready:
        case ComponentState::Valid:
        case ComponentState::Complete:
        case ComponentState::Committed:
        case ComponentState::Deployed:
            return GreenDark;
        case ComponentState::Dirty:
        case ComponentState::Warning:
        case ComponentState::Staged:
            return AmberDark;
        case ComponentState::Blocked:
        case ComponentState::Faulted:
            return RedDark;
        case ComponentState::Validating:
        case ComponentState::Simulated:
            return BlueDark;
        case ComponentState::Running:
            return CyanDark;
        case ComponentState::Degraded:
            return OrangeDark;
        case ComponentState::Locked:
            return GoldDark;
        case ComponentState::Idle:
        case ComponentState::Disconnected:
        default:
            return Charcoal;
    }
}

[[nodiscard]] constexpr std::uint8_t authority_rank(AuthorityLevel authority) noexcept {
    return static_cast<std::uint8_t>(authority);
}

[[nodiscard]] constexpr bool authority_allows(AuthorityLevel current, AuthorityLevel required) noexcept {
    return authority_rank(current) >= authority_rank(required);
}

[[nodiscard]] constexpr std::string_view authority_label(AuthorityLevel authority) noexcept {
    switch (authority) {
        case AuthorityLevel::Observe: return "Observe";
        case AuthorityLevel::Draft: return "Draft";
        case AuthorityLevel::Stage: return "Stage";
        case AuthorityLevel::Execute: return "Execute";
        case AuthorityLevel::Commit: return "Commit";
        case AuthorityLevel::Override: return "Override";
        case AuthorityLevel::Root: return "Root";
    }
    return "Unknown";
}

[[nodiscard]] constexpr std::string_view authority_description(AuthorityLevel authority) noexcept {
    switch (authority) {
        case AuthorityLevel::Observe: return "Read-only access to all systems";
        case AuthorityLevel::Draft: return "Create and edit drafts";
        case AuthorityLevel::Stage: return "Stage changes for review";
        case AuthorityLevel::Execute: return "Execute operational commands";
        case AuthorityLevel::Commit: return "Commit permanent changes";
        case AuthorityLevel::Override: return "Override safety controls";
        case AuthorityLevel::Root: return "Full system access";
    }
    return "Unknown authority level";
}

[[nodiscard]] constexpr Rgba8 family_accent_colour(ComponentFamily family) noexcept {
    switch (family) {
        case ComponentFamily::ActionCommand: return Green;
        case ComponentFamily::FeedbackStatus: return Blue;
        case ComponentFamily::InputControl: return Slate;
        case ComponentFamily::Navigation: return Cyan;
        case ComponentFamily::DataDisplay: return Slate;
        case ComponentFamily::Overlay: return Slate;
        case ComponentFamily::AuthorityPermission: return Gold;
        case ComponentFamily::AiModel: return Purple;
        case ComponentFamily::StreamLive: return Cyan;
        case ComponentFamily::SafetyCircuit: return Red;
        case ComponentFamily::TraceAudit: return Cyan;
        case ComponentFamily::WorkspaceLayout: return Slate;
    }
    return Slate;
}

enum class VisualDominance : std::uint8_t {
    Transparent = 0,
    PublicBlue = 1,
    VerifiedGreen = 2,
    NumericYellow = 3,
    RuntimeCyan = 4,
    AuthorityGold = 5,
    RestrictedOrange = 6,
    DeniedRed = 7,
    SealedPurple = 8,
    UnknownGrey = 9,
    MaskedBlack = 10,
};

[[nodiscard]] constexpr Rgba8 dominance_colour(VisualDominance dominance) noexcept {
    switch (dominance) {
        case VisualDominance::PublicBlue: return Blue;
        case VisualDominance::VerifiedGreen: return Green;
        case VisualDominance::NumericYellow: return Amber;
        case VisualDominance::RuntimeCyan: return Cyan;
        case VisualDominance::AuthorityGold: return Gold;
        case VisualDominance::RestrictedOrange: return Orange;
        case VisualDominance::DeniedRed: return Red;
        case VisualDominance::SealedPurple: return Purple;
        case VisualDominance::UnknownGrey: return Steel500;
        case VisualDominance::MaskedBlack: return Black;
        case VisualDominance::Transparent:
        default: return Void;
    }
}

// Dominance-preserving colour monoid. Denied, sealed and masked states cannot
// be visually laundered into allowed or public states.
[[nodiscard]] constexpr VisualDominance compose_visual(VisualDominance a, VisualDominance b) noexcept {
    if (a == VisualDominance::MaskedBlack || b == VisualDominance::MaskedBlack) return VisualDominance::MaskedBlack;
    if (a == VisualDominance::DeniedRed || b == VisualDominance::DeniedRed) return VisualDominance::DeniedRed;
    if (a == VisualDominance::SealedPurple || b == VisualDominance::SealedPurple) return VisualDominance::SealedPurple;
    if (a == VisualDominance::UnknownGrey || b == VisualDominance::UnknownGrey) return VisualDominance::UnknownGrey;
    if (a == VisualDominance::RestrictedOrange || b == VisualDominance::RestrictedOrange) return VisualDominance::RestrictedOrange;
    if (a == VisualDominance::AuthorityGold || b == VisualDominance::AuthorityGold) return VisualDominance::AuthorityGold;
    if (a == VisualDominance::RuntimeCyan || b == VisualDominance::RuntimeCyan) return VisualDominance::RuntimeCyan;
    if (a == VisualDominance::NumericYellow || b == VisualDominance::NumericYellow) return VisualDominance::NumericYellow;
    if (a == VisualDominance::VerifiedGreen || b == VisualDominance::VerifiedGreen) return VisualDominance::VerifiedGreen;
    if (a == VisualDominance::PublicBlue || b == VisualDominance::PublicBlue) return VisualDominance::PublicBlue;
    return VisualDominance::Transparent;
}

struct MaskColourGlyph {
    Rgba8 fill{};
    Rgba8 background{};
    Rgba8 border{};
    std::uint16_t pattern{};
    std::uint16_t pulse{};
    std::uint32_t flags{};
};

struct ProjectionStyle {
    MaskColourGlyph glyph{};
    ComponentDensity density{ComponentDensity::Compact};
    ComponentFamily family{ComponentFamily::DataDisplay};
    ComponentCriticality criticality{ComponentCriticality::Operational};
};

enum MaskStateFlags : std::uint32_t {
    MaskState_None = 0u,
    MaskState_Public = 1u << 0u,
    MaskState_Verified = 1u << 1u,
    MaskState_Numeric = 1u << 2u,
    MaskState_Runtime = 1u << 3u,
    MaskState_Authority = 1u << 4u,
    MaskState_Restricted = 1u << 5u,
    MaskState_Denied = 1u << 6u,
    MaskState_Sealed = 1u << 7u,
    MaskState_Unknown = 1u << 8u,
    MaskState_Masked = 1u << 9u,
    MaskState_Secret = 1u << 10u,
    MaskState_Faulted = 1u << 11u,
};

[[nodiscard]] constexpr VisualDominance visual_from_mask_flags(std::uint32_t flags) noexcept {
    VisualDominance out = VisualDominance::Transparent;
    if ((flags & MaskState_Public) != 0u) out = compose_visual(out, VisualDominance::PublicBlue);
    if ((flags & MaskState_Verified) != 0u) out = compose_visual(out, VisualDominance::VerifiedGreen);
    if ((flags & MaskState_Numeric) != 0u) out = compose_visual(out, VisualDominance::NumericYellow);
    if ((flags & MaskState_Runtime) != 0u) out = compose_visual(out, VisualDominance::RuntimeCyan);
    if ((flags & MaskState_Authority) != 0u) out = compose_visual(out, VisualDominance::AuthorityGold);
    if ((flags & MaskState_Restricted) != 0u) out = compose_visual(out, VisualDominance::RestrictedOrange);
    if ((flags & MaskState_Unknown) != 0u) out = compose_visual(out, VisualDominance::UnknownGrey);
    if ((flags & (MaskState_Denied | MaskState_Faulted)) != 0u) out = compose_visual(out, VisualDominance::DeniedRed);
    if ((flags & (MaskState_Sealed | MaskState_Secret)) != 0u) out = compose_visual(out, VisualDominance::SealedPurple);
    if ((flags & MaskState_Masked) != 0u) out = compose_visual(out, VisualDominance::MaskedBlack);
    return out;
}

[[nodiscard]] constexpr MaskColourGlyph glyph_from_mask_flags(std::uint32_t flags) noexcept {
    const auto dominance = visual_from_mask_flags(flags);
    const auto fill = dominance_colour(dominance);
    return MaskColourGlyph{
        .fill = fill,
        .background = (dominance == VisualDominance::DeniedRed) ? RedDark :
                      (dominance == VisualDominance::SealedPurple) ? PurpleDark :
                      (dominance == VisualDominance::RestrictedOrange) ? OrangeDark :
                      (dominance == VisualDominance::AuthorityGold) ? GoldDark :
                      (dominance == VisualDominance::RuntimeCyan) ? CyanDark :
                      (dominance == VisualDominance::PublicBlue) ? BlueDark :
                      (dominance == VisualDominance::VerifiedGreen) ? GreenDark :
                      Charcoal,
        .border = fill,
        .pattern = static_cast<std::uint16_t>((flags & MaskState_Secret) ? 2u : ((flags & MaskState_Restricted) ? 1u : 0u)),
        .pulse = static_cast<std::uint16_t>((flags & MaskState_Runtime) ? 1u : 0u),
        .flags = flags,
    };
}

[[nodiscard]] constexpr ProjectionStyle projection_style_from_mask_flags(
    std::uint32_t flags,
    ComponentFamily family = ComponentFamily::DataDisplay,
    ComponentDensity density = ComponentDensity::Compact
) noexcept {
    return ProjectionStyle{
        .glyph = glyph_from_mask_flags(flags),
        .density = density,
        .family = family,
        .criticality = ((flags & (MaskState_Denied | MaskState_Faulted | MaskState_Secret)) != 0u)
            ? ComponentCriticality::Critical
            : ((flags & MaskState_Restricted) != 0u)
                ? ComponentCriticality::Audit
                : ComponentCriticality::Operational,
    };
}

[[nodiscard]] constexpr std::string_view ansi_fg_code(Rgba8 colour) noexcept {
    if (colour == Green) return "\033[38;2;54;212;123m";
    if (colour == Red) return "\033[38;2;242;75;75m";
    if (colour == Amber) return "\033[38;2;242;184;75m";
    if (colour == Orange) return "\033[38;2;240;122;42m";
    if (colour == Blue) return "\033[38;2;75;163;242m";
    if (colour == Cyan) return "\033[38;2;53;208;227m";
    if (colour == Purple) return "\033[38;2;166;120;242m";
    if (colour == Gold) return "\033[38;2;214;168;79m";
    if (colour == Black) return "\033[38;2;5;6;8m";
    return "\033[38;2;95;110;122m";
}

inline constexpr std::string_view ansi_reset = "\033[0m";

[[nodiscard]] constexpr std::string_view graphviz_hex(Rgba8 colour) noexcept {
    if (colour == Green) return "#36D47B";
    if (colour == Red) return "#F24B4B";
    if (colour == Amber) return "#F2B84B";
    if (colour == Orange) return "#F07A2A";
    if (colour == Blue) return "#4BA3F2";
    if (colour == Cyan) return "#35D0E3";
    if (colour == Purple) return "#A678F2";
    if (colour == Gold) return "#D6A84F";
    if (colour == Slate) return "#6E7F8D";
    if (colour == Steel500) return "#5F6E7A";
    if (colour == Black) return "#050608";
    if (colour == White) return "#F4F7F8";
    return "#5F6E7A";
}

[[nodiscard]] constexpr std::string_view mermaid_class_for_dominance(VisualDominance dominance) noexcept {
    switch (dominance) {
        case VisualDominance::PublicBlue: return "tfPublic";
        case VisualDominance::VerifiedGreen: return "tfVerified";
        case VisualDominance::NumericYellow: return "tfWarning";
        case VisualDominance::RuntimeCyan: return "tfRuntime";
        case VisualDominance::AuthorityGold: return "tfAuthority";
        case VisualDominance::RestrictedOrange: return "tfRestricted";
        case VisualDominance::DeniedRed: return "tfDenied";
        case VisualDominance::SealedPurple: return "tfSealed";
        case VisualDominance::UnknownGrey: return "tfUnknown";
        case VisualDominance::MaskedBlack: return "tfMasked";
        case VisualDominance::Transparent:
        default: return "tfNeutral";
    }
}

} // namespace tfdesign
