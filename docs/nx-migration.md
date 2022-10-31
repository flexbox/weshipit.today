# Nx migrations

References:

- [Updating Nx official documentation](https://nx.dev/using-nx/updating-nx#updating-nx)

## Migrate Nx and supported libraries

Ensure the nx cli is installed in your local project.

```bash
yarn add --dev @nrwl/cli
```

Check for the new versions.

```bash
nx migrate latest
```

Do the upgrades. It will update our `package.json`

```bash
yarn nx migrate --run-migrations
```

After you run all the migrations, you can remove `migrations.json` and commit any outstanding changes.

```bash
rm migrations.json
```
