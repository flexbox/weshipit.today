# Sources

The film contains **no statistics**. The only numbers on screen are visit labels (1, 2, 3) that belong to the example, plus a clock reading `09:41` in the mock status bar.

| Claim in the film                                                                        | Source                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Offline-first / local-first apps write to local storage first and sync to a server later | Kleppmann, Wiggins, van Hardenberg, McGranaghan, _Local-first software: You own your data, in spite of the cloud_, Ink & Switch, 2019. https://www.inkandswitch.com/local-first/                          |
| Changes made while offline are queued and sent when the connection returns               | Legend State docs, _Persist and Sync_: changes made offline are persisted locally along with pending changes, and retried when back online. https://legendapp.com/open-source/state/v3/sync/persist-sync/ |
| Syncing "in order"                                                                       | Shown as a FIFO queue. This is a simplification: real sync engines may batch or merge changes. The film's example has no conflicts, so order of arrival = order of taps. Logged in DECISIONS.md.          |
| A server-first app can't save without a connection                                       | Follows from the architecture: the write _is_ a network request. No external number is needed.                                                                                                            |
