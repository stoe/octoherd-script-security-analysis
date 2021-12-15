/**
 * @param {import('@octoherd/octokit').Octokit} octokit
 * @param {import('@octokit/openapi-types').components["schemas"]["repository"]} repository
 * @param {object} options Custom user options passed to the CLI
 * @param {boolean} [options.alerts=false] Enable Dependabot alerts
 * @param {boolean} [options.fixes=false] Enable Dependabot security updates (will also enable Dependabot alerts)
 */
export async function script(octokit, repository, {alerts = false, fixes = false}) {
  // skip fast
  if (!alerts && !fixes) {
    octokit.log.error({exit: true}, 'To run, please provide either `--alerts` or `--fixes` flag')
    process.exit(1)
  }

  if (repository.archived) {
    octokit.log.info(
      {updated: false, skipped: true},
      'Skipping to enable Dependabot alerts and security updates on archived repository'
    )
    return
  }

  // run...
  const {
    owner: {login: owner},
    name: repo
  } = repository

  try {
    if (alerts || fixes) {
      // https://docs.github.com/en/rest/reference/repos#enable-vulnerability-alerts
      await octokit.request('PUT /repos/{owner}/{repo}/vulnerability-alerts', {
        owner,
        repo
      })

      octokit.log.info({updated: true}, 'Dependabot alerts enabled')
    } else {
      octokit.log.info({updated: false}, 'Dependabot alerts not enabled')
    }

    if (fixes) {
      // https://docs.github.com/en/rest/reference/repos#enable-automated-security-fixes
      await octokit.request('PUT /repos/{owner}/{repo}/automated-security-fixes', {
        owner,
        repo
      })

      octokit.log.info({updated: true}, 'Dependabot security updates enabled')
    } else {
      octokit.log.info({updated: false}, 'Dependabot security updates not enabled')
    }
  } catch (error) {
    octokit.log.error({updated: false, error}, 'Dependabot alerts and security updates not enabled')
  }

  // wait to not overuse API rate limits
  await wait()

  return true
}

/**
 * Wait for 2.5 seconds
 *
 * @returns {Promise}
 */
const wait = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve(true), 2500)
  })
}
