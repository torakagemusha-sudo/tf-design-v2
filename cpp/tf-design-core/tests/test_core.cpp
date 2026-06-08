#include <tfdesign/core.hpp>

#include <cassert>
#include <cstdint>

using namespace tfdesign;

int main() {
    // Parity with src/utils/index.ts STATE_COLORS / STATE_BG_COLORS.
    static_assert(state_colour(ComponentState::Idle) == Steel500);
    static_assert(state_colour(ComponentState::Ready) == Green);
    static_assert(state_colour(ComponentState::Dirty) == Amber);
    static_assert(state_colour(ComponentState::Validating) == Blue);
    static_assert(state_colour(ComponentState::Valid) == Green);
    static_assert(state_colour(ComponentState::Warning) == Amber);
    static_assert(state_colour(ComponentState::Blocked) == Red);
    static_assert(state_colour(ComponentState::Staged) == Amber);
    static_assert(state_colour(ComponentState::Running) == Cyan);
    static_assert(state_colour(ComponentState::Complete) == Green);
    static_assert(state_colour(ComponentState::Degraded) == Orange);
    static_assert(state_colour(ComponentState::Faulted) == Red);
    static_assert(state_colour(ComponentState::Locked) == Gold);
    static_assert(state_colour(ComponentState::Simulated) == Blue);
    static_assert(state_colour(ComponentState::Committed) == Green);
    static_assert(state_colour(ComponentState::Deployed) == Green);
    static_assert(state_colour(ComponentState::Disconnected) == Steel500);

    static_assert(state_background_colour(ComponentState::Idle) == Charcoal);
    static_assert(state_background_colour(ComponentState::Ready) == GreenDark);
    static_assert(state_background_colour(ComponentState::Warning) == AmberDark);
    static_assert(state_background_colour(ComponentState::Blocked) == RedDark);
    static_assert(state_background_colour(ComponentState::Running) == CyanDark);
    static_assert(state_background_colour(ComponentState::Degraded) == OrangeDark);
    static_assert(state_background_colour(ComponentState::Locked) == GoldDark);

    // Authority mapping parity with src/utils/index.ts.
    static_assert(authority_rank(AuthorityLevel::Observe) == 0);
    static_assert(authority_rank(AuthorityLevel::Draft) == 1);
    static_assert(authority_rank(AuthorityLevel::Stage) == 2);
    static_assert(authority_rank(AuthorityLevel::Execute) == 3);
    static_assert(authority_rank(AuthorityLevel::Commit) == 4);
    static_assert(authority_rank(AuthorityLevel::Override) == 5);
    static_assert(authority_rank(AuthorityLevel::Root) == 6);
    static_assert(authority_allows(AuthorityLevel::Execute, AuthorityLevel::Stage));
    static_assert(!authority_allows(AuthorityLevel::Draft, AuthorityLevel::Execute));
    static_assert(authority_label(AuthorityLevel::Root) == "Root");
    static_assert(authority_description(AuthorityLevel::Override) == "Override safety controls");

    // Component family accents from README v2 table.
    static_assert(family_accent_colour(ComponentFamily::ActionCommand) == Green);
    static_assert(family_accent_colour(ComponentFamily::AuthorityPermission) == Gold);
    static_assert(family_accent_colour(ComponentFamily::AiModel) == Purple);
    static_assert(family_accent_colour(ComponentFamily::StreamLive) == Cyan);
    static_assert(family_accent_colour(ComponentFamily::SafetyCircuit) == Red);

    // Visual dominance: denied/sealed/secret/masked cannot be laundered.
    static_assert(compose_visual(VisualDominance::VerifiedGreen, VisualDominance::DeniedRed) == VisualDominance::DeniedRed);
    static_assert(compose_visual(VisualDominance::PublicBlue, VisualDominance::SealedPurple) == VisualDominance::SealedPurple);
    static_assert(compose_visual(VisualDominance::RestrictedOrange, VisualDominance::VerifiedGreen) == VisualDominance::RestrictedOrange);
    static_assert(compose_visual(VisualDominance::AuthorityGold, VisualDominance::MaskedBlack) == VisualDominance::MaskedBlack);

    constexpr auto denied = visual_from_mask_flags(MaskState_Verified | MaskState_Denied);
    static_assert(denied == VisualDominance::DeniedRed);

    constexpr auto sealed = visual_from_mask_flags(MaskState_Public | MaskState_Sealed);
    static_assert(sealed == VisualDominance::SealedPurple);

    constexpr auto secret = visual_from_mask_flags(MaskState_Verified | MaskState_Secret);
    static_assert(secret == VisualDominance::SealedPurple);

    constexpr auto masked = visual_from_mask_flags(MaskState_Verified | MaskState_Public | MaskState_Masked);
    static_assert(masked == VisualDominance::MaskedBlack);

    constexpr auto style = projection_style_from_mask_flags(MaskState_Runtime | MaskState_Restricted, ComponentFamily::TraceAudit);
    static_assert(style.glyph.fill == Orange);
    static_assert(style.glyph.pattern == 1);
    static_assert(style.glyph.pulse == 1);
    static_assert(style.family == ComponentFamily::TraceAudit);
    static_assert(style.criticality == ComponentCriticality::Audit);

    constexpr auto faulted_style = projection_style_from_mask_flags(MaskState_Faulted | MaskState_Public);
    static_assert(faulted_style.glyph.fill == Red);
    static_assert(faulted_style.criticality == ComponentCriticality::Critical);

    static_assert(graphviz_hex(Green) == "#36D47B");
    static_assert(mermaid_class_for_dominance(VisualDominance::DeniedRed) == "tfDenied");

    assert(true);
    return 0;
}
