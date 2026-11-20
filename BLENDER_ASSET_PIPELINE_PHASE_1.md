# AETHER NOVA — Blender asset pipeline (Phase 1)

## Purpose

Generate a first, non-production 3D interceptor prototype with Blender in a GitHub-hosted runner. This avoids installing Blender or running a 3D workload on the project's low-spec Windows PC.

## Prototype

- Asset: Valkyrie-class interceptor (working designation).
- Source generator: `tools/blender/generate_interceptor.py`.
- Native editable project: `aether-nova-interceptor.blend`.
- Runtime interchange: `aether-nova-interceptor.glb`.
- Preview: `aether-nova-interceptor-preview.png`.

The model is procedurally generated from original geometry and materials. It is a first blockout-quality asset, not yet a final art-approved ship and not yet connected to the live game.

## Generate locally (on a capable machine with Blender)

```bash
blender --background --python tools/blender/generate_interceptor.py -- --output-dir dist
```

No external Python packages are required by the generator.

## Generate remotely through GitHub Actions

1. Open the repository's **Actions** tab.
2. Select **Blender asset prototype**.
3. Select **Run workflow**.
4. Wait for the job to finish.
5. Open the successful run and download the artifact named `aether-nova-interceptor-prototype`.

The workflow installs Blender on a GitHub-hosted Ubuntu runner and uploads the generated files as a temporary workflow artifact (14-day retention). It does not commit binary assets to `main`, deploy the game, or alter runtime code.

## Integration policy

Do not replace the existing player ship until the GLB has been inspected, its scale/orientation/materials have been checked in the target renderer, and performance has been tested on Android TV and lower-end devices. Keep the source `.blend` and generator script for future edits.

## Cost and limitations

The workflow is intended for a public GitHub repository using GitHub-hosted runners. GitHub Actions usage and limits depend on the account and current GitHub policy; check the repository's Actions usage if GitHub requests billing. No paid cloud GPU or RunPod Pod is created.
