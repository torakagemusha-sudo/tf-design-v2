# TF Design C++ Core v0.1

Header-only C++20 semantic kernel derived from `tf-design-v2`.

This package does **not** port React components. It ports the runtime-relevant design semantics needed by Matrix Control OS, Matrix Capsule Format, the Bitmask Projection Engine, terminal/graph renderers, and native operator cockpits.

## Canonical source

- `src/types/index.ts`
  - `TorafirmaComponentState`
  - `AuthorityLevel`
  - `CommandClass`
  - `CommandState`
  - `ComponentDensity`
  - `ComponentCriticality`
- `src/utils/index.ts`
  - authority labels/descriptions/ranks
  - state foreground/background colour mappings
- `src/styles/tokens.css`
  - canonical colour tokens
- root `README.md`
  - 12 component families and accent semantics

## Layout

```text
cpp/tf-design-core/
  CMakeLists.txt
  include/tfdesign/core.hpp
  tests/test_core.cpp
```

## Build

```bash
cmake -S cpp/tf-design-core -B build/tf-design-core
cmake --build build/tf-design-core
ctest --test-dir build/tf-design-core --output-on-failure
```

## Design rules

1. Dependency-light: no React, Qt, ImGui, SDL, or Matrix OS dependency.
2. Renderer-neutral: exports tokens, enums, glyph structs, and helpers only.
3. Constexpr-heavy: hot mappings are compile-time capable.
4. Dominance-preserving: denied, sealed, secret, masked, and faulted states cannot visually launder into allowed/public/verified colours.
5. Matrix-compatible: `MaskColourGlyph` and `ProjectionStyle` are deliberately shaped for Matrix Control OS projection rendering.

## Minimal API

```cpp
#include <tfdesign/core.hpp>

using namespace tfdesign;

static_assert(state_colour(ComponentState::Running) == Cyan);
static_assert(authority_rank(AuthorityLevel::Root) == 6);
static_assert(compose_visual(VisualDominance::VerifiedGreen,
                             VisualDominance::DeniedRed)
              == VisualDominance::DeniedRed);

auto style = projection_style_from_mask_flags(
    MaskState_Runtime | MaskState_Restricted,
    ComponentFamily::TraceAudit
);
```

## Matrix Control OS integration

`MaskStateFlags` are adapter-level flags. Matrix Control OS can map its own projection/visibility/evidence/authority/hazard/factor masks into these flags and then request a deterministic `ProjectionStyle`.

```text
Matrix mask tensor
→ adapter flags
→ VisualDominance monoid
→ MaskColourGlyph
→ terminal / graph / cockpit renderer
```

## Non-goals for v0.1

- no direct React parity layer;
- no CSS parser;
- no runtime token loading;
- no GUI toolkit binding;
- no authority decision engine;
- no Matrix OS dependency.

Those belong in separate adapters.
