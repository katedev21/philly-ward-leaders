import nanoid from 'nanoid'

import Api from '../api'
import { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } from '../config'

const api = new Api(CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN)

export function NOTIFY (ctx, msg) {
  const id = nanoid()
  const duration = 5000
  const notification = { id, msg }
  ctx.commit('ADD_NOTIFICATION', notification)
  window.setTimeout(() => ctx.commit('REMOVE_NOTIFICATION', id), duration)
}

export async function FETCH_LEADERS (ctx) {
  ctx.commit('BEGIN_REQUEST', 'FETCH_LEADERS')
  try {
    const leaders = await api.fetchLeaders()
    ctx.commit('FETCH_LEADERS_SUCCESS', leaders)
  } catch (err) {
    ctx.dispatch('NOTIFY', `Failed to retrieve ward leaders`)
  }
  ctx.commit('END_REQUEST', 'FETCH_LEADERS')
}

export async function FETCH_LEADER (ctx, { ward, party }) {
  ctx.commit('RESET_LEADER')
  ctx.commit('BEGIN_REQUEST', 'FETCH_LEADER')
  try {
    const leader = await api.fetchLeader(ward, party)
    ctx.commit('FETCH_LEADER_SUCCESS', leader)
  } catch (err) {
    ctx.dispatch('NOTIFY', `Failed to get information about the ward leader`)
  }
  ctx.commit('END_REQUEST', 'FETCH_LEADER')
}

export async function FETCH_COMMITTEE_PERSONS (ctx, { ward, party }) {
  ctx.commit('BEGIN_REQUEST', 'FETCH_COMMITTEE_PERSONS')
  try {
    const committeePersons = await api.fetchCommitteePersons(ward, party)
    ctx.commit('FETCH_COMMITTEE_PERSONS_SUCCESS', committeePersons)
  } catch (err) {
    ctx.dispatch('NOTIFY', `Failed to get list of committee persons`)
  }
  ctx.commit('END_REQUEST', 'FETCH_COMMITTEE_PERSONS')
}

export async function FETCH_WARD_BOUNDARIES (ctx, ward) {
  ctx.commit('BEGIN_REQUEST', 'FETCH_WARD_BOUNDARIES')
  try {
    const wardBoundaries = await api.fetchWardBoundaries(ward)
    ctx.commit('FETCH_WARD_BOUNDARIES_SUCCESS', wardBoundaries)
  } catch (err) {
    ctx.commit('END_REQUEST', 'FETCH_WARD_BOUNDARIES')
  }
  ctx.commit('END_REQUEST', 'FETCH_WARD_BOUNDARIES')
}

export async function FETCH_CITYWIDE_BOUNDARIES (ctx) {
  ctx.commit('BEGIN_REQUEST', 'FETCH_CITYWIDE_BOUNDARIES')
  try {
    const citywideBoundaries = await api.fetchCitywideBoundaries()
    ctx.commit('CITYWIDE_BOUNDARIES_SUCCESS', citywideBoundaries)
  } catch (err) {
    ctx.dispatch('NOTIFY', `Failed to retrieve ward boundaries`)
  }
  ctx.commit('END_REQUEST', 'FETCH_CITYWIDE_BOUNDARIES')
}

export async function FETCH_CONTENT_PAGE (ctx, slug) {
  ctx.commit('BEGIN_REQUEST', 'FETCH_CONTENT_PAGE')
  try {
    const contentPage = api.fetchContentPage(slug)
    ctx.commit('FETCH_CONTENT_PAGE_SUCCESS', contentPage)
  } catch (err) {
    ctx.dispatch('NOTIFY', `Failed to retrieve content`)
  }
  ctx.commit('END_REQUEST', 'FETCH_CONTENT_PAGE')
}
