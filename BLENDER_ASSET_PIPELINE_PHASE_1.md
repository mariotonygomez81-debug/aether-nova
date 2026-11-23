# AETHER NOVA — Blender asset pipeline (Phase 1 expanded)

## Purpose

Generate and validate the Valkyrie interceptor on a GitHub-hosted runner. Blender runs remotely, so the project's low-spec Windows PC does not need Blender or local rendering workloads.

## Production stack

- **Blender + Python:** original procedural hull, wing, cockpit, engines, landing gear and mechanical detailing.
- **Blender Geometry Nodes:** repeatable procedural armor-rib details, realized for interchange export.
- **Procedural PBR shader nodes:** subtle micro-surface normal breakup on metallic aerospace materials.
- **Poly Haven HDRI:** Studio Small 03 at 1K for physically based studio reflections and lighting. Asset is CC0. The HDRI is used for the render stage and is not bundled into the runtime GLB. Poly Haven live API use requires a clear credit; project pipeline documentation records the source.
- **glTF Transform:** creates a separately optimized game-ready GLB while preserving the original GLB.
- **Khronos glTF Validator:** checks the optimized GLB against the glTF 2.0 specification and writes a JSON report.

## Outputs

- aether-nova-interceptor.blend — editable Blender source project.
- aether-nova-interceptor.glb — unoptimized interchange export.
- aether-nova-interceptor-optimized.glb — optimized runtime candidate.
- aether-nova-interceptor-preview.png — studio preview render.
- gltf-validation-report.json — Khronos validation report.

## Generate remotely through GitHub Actions

The **Blender asset prototype** workflow installs Blender and headless rendering dependencies, downloads the 1K Poly Haven HDRI, runs the procedural generator, optimizes the GLB, validates it and uploads the outputs as a temporary artifact (14-day retention).

1. Open the repository's **Actions** tab.
2. Select **Blender asset prototype**.
3. Select **Run workflow** when a manual run is needed.
4. Wait for every generation, optimization and validation step to finish.
5. Open the successful run and download **aether-nova-interceptor-prototype**.

## Licensing and attribution

- Original AETHER NOVA geometry and generator code are maintained in this repository.
- Poly Haven Studio Small 03 HDRI by Greg Zaal is CC0. The workflow accesses the Poly Haven public API, so the project documentation credits Poly Haven as the source.
- Blender, glTF Transform and Khronos glTF Validator retain their respective upstream licenses. Their tools are used in the build pipeline; no third-party executable is committed to the game repository.

## Integration policy

Do not replace the existing player ship until the generated GLB has been inspected, scale/orientation/materials have been checked in the target renderer, and performance has been tested on Android TV, PC and lower-end mobile devices. Keep the editable BLEND and procedural source for future revisions. The optimized GLB is a candidate, not yet an approved production asset.

This workflow does not modify game.js, aether3d.js, the Joystick repository, Supabase, or the multiplayer server, and does not deploy the game.

## Cost and limitations

The workflow uses GitHub-hosted CPU runners and Blender EEVEE software rendering. It does not provision a paid GPU or cloud machine. GitHub Actions usage and limits depend on the account and current GitHub policy. The Poly Haven HDRI is downloaded at 1K to limit network and memory use.


## Valkyrie visual redesign — iteration 2

The procedural ship generator now replaces the fragmented prototype silhouette with a unified design pass:
- wider continuous armored fuselage with a tapered nose and broad shoulders;
- thick, sculpted manta/delta wing with integrated graphite armor panels;
- elongated faceted gold-tinted cockpit instead of a spherical canopy;
- recessed cyan ion apertures, restrained panel seams and aft cooling ribs;
- twin integrated rear nacelles with reactor cores;
- integrated side cannons and three-point landing gear;
- smaller canted stabilizers so the primary wing remains visually dominant.

This is a geometry redesign, not an approved in-game replacement. The new Blender workflow must complete and the preview must be reviewed before the GLB is integrated into the game.
