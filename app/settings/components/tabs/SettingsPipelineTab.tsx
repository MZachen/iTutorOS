// @ts-nocheck
"use client";

export type SettingsPipelineTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsPipelineTab({ ctx }: SettingsPipelineTabProps) {
  const {
    accountForm,
    accountInitial,
    activeEmailInboxes,
    activeLeadCount,
    activeLocations,
    activeTab,
    activeTutorCount,
    addCatalogMedia,
    addEmailInbox,
    addRoom,
    addService,
    addSubject,
    addTopic,
    aiRewriteLoading,
    aiRewrites,
    ALL_TABS,
    anyDirty,
    anyDirtyRef,
    AppHeader,
    ARCHIVE_LABELS,
    ARCHIVE_OPTIONS,
    archiveEdits,
    archiveEditsForType,
    archiveEmailInbox,
    archiveHasChanges,
    ArchiveIcon,
    archiveLocation,
    archiveMaps,
    archiveRoom,
    archiveRows,
    archiveSort,
    archiveTutor,
    archiveType,
    ArrowDown01Icon,
    ArrowUp01Icon,
    billableLocations,
    BookOpen01Icon,
    bufferDraft,
    Building04Icon,
    buildProductDraft,
    buildSubjectDrafts,
    businessForm,
    businessInitial,
    Calendar01Icon,
    canAddLocation,
    canAddTutor,
    Cancel01Icon,
    cancelEditLocation,
    cancelEditRoom,
    catalogMediaByKey,
    catalogMediaKey,
    catalogMediaLoading,
    centsToDollars,
    CheckmarkCircle01Icon,
    checkoutHref,
    checkoutHrefFor,
    childPrompt,
    childPromptResolverRef,
    ClampedCell,
    clearAiRewrite,
    clearSocialBuilder,
    CLIENT_FIELDS_STORAGE_KEY,
    clientsForm,
    closeChildUnarchivePrompt,
    closePasswordPrompt,
    companyDirty,
    companyDraft,
    confirmWithPassword,
    connectGoogleInbox,
    CONNECTION_PROVIDERS,
    connectionCardGradient,
    connections,
    connectionsDirty,
    connectionSnapshots,
    connectionStatusById,
    connectionStatusLabel,
    CONTENT_STUDIO_TABS,
    Copy01Icon,
    CreditCardIcon,
    DATE_FORMAT_OPTIONS,
    dateFormat,
    DEFAULT_DATE_FORMAT,
    DEFAULT_SERVICE_NAMES,
    DEFAULT_SUBJECTS,
    DEFAULT_TUTOR_COLOR,
    defaultClientFieldPrefs,
    defaultPipelineSources,
    dirtyTabs,
    discardActive,
    discardSocialCopy,
    dollarsToCents,
    dynamic,
    editLocationDraft,
    editLocationId,
    editRoomDraft,
    editRoomId,
    emailInboxes,
    EMPTY_PRODUCT_DRAFT,
    EMPTY_SOCIAL_DRAFT,
    formatCurrencyFromCents,
    formatDateWithPattern,
    formatPlanLimit,
    Fragment,
    generateSocialCopy,
    generateSocialImage,
    getConnectionProvider,
    getNewRoomDraft,
    getSupabaseBrowserClient,
    handleMediaFileUpload,
    handleSocialTemplateUpload,
    HugeiconsIcon,
    Input,
    isTutorOnly,
    Label,
    LazySettingsTabPanels,
    leadDisplayName,
    leadLimit,
    leads,
    Link01Icon,
    loadCatalogMedia,
    loading,
    loadPipelineSources,
    Location01Icon,
    locationNameById,
    locations,
    locLimit,
    makeEmailSource,
    makeUniqueServiceCode,
    MARKETING_SECTIONS,
    MarketingIcon,
    marketingSection,
    marketingServiceByCode,
    marketingServices,
    marketingSubjectId,
    marketingTab,
    me,
    mediaUrlDrafts,
    mergeEmailInboxSources,
    newEmailInbox,
    newRoomDrafts,
    newService,
    newSubjectName,
    newTopicDrafts,
    newTutor,
    normalizeClientFieldPrefs,
    normalizeDateFormat,
    normalizeKey,
    normalizePlanKey,
    onSave,
    openBillingPortal,
    openChildUnarchivePrompt,
    openPasswordPrompt,
    org,
    otherPlans,
    PackageIcon,
    PARENT_FIELDS,
    parentDisplayName,
    parentNameById,
    parents,
    parseNonNegativeInt,
    passwordDraft,
    passwordPrompt,
    passwordPromptResolverRef,
    patchEmailInbox,
    pipelineForm,
    PipelineIcon,
    plan,
    PLAN_ORDER,
    planCardColor,
    planKey,
    planLabel,
    planLeadLimit,
    planLocationLimit,
    planSpecs,
    planSpecsFor,
    planTutorLimit,
    productAutoSelectedRef,
    productDirty,
    productDraft,
    productDraftInitial,
    productMedia,
    productMediaKey,
    productMediaLoading,
    products,
    productTopicOptions,
    providerLabel,
    queryHandledRef,
    readFileAsDataUrl,
    removeCatalogMedia,
    removePipelineSource,
    removeSocialTemplate,
    renderSortIcons,
    rewriteWithAi,
    roomsByLocation,
    router,
    saveAccount,
    saveAllConnections,
    saveBusiness,
    saveClientFieldPrefs,
    saveClientFields,
    saveCompanyContent,
    saveConnection,
    saveEditLocation,
    saveEditRoom,
    savePipelineSettings,
    savePipelineSources,
    saveProducts,
    saveSchedule,
    saveServiceDescription,
    saveServices,
    saveSocialPost,
    saveSubjectDescription,
    saveSubjectsTopics,
    saveTopicDescription,
    saveTutors,
    scheduleForm,
    scheduleInitial,
    searchParams,
    selectedCarouselPresetId,
    selectedProductService,
    selectedServiceLocationId,
    selectProduct,
    sendResetEmail,
    serviceById,
    serviceCatalogDrafts,
    serviceDescriptionDrafts,
    serviceEdits,
    ServiceIcon,
    serviceLocationId,
    serviceLogoDrafts,
    serviceRows,
    servicesByLocation,
    serviceSort,
    setActiveTab,
    setAiLoading,
    setAiRewrite,
    setAiRewriteLoading,
    setAiRewrites,
    setArchiveEdits,
    setArchiveSort,
    setArchiveType,
    setBufferDraft,
    setCatalogMediaByKey,
    setCatalogMediaLoading,
    setChildPrompt,
    setCompanyDraft,
    setConnections,
    setConnectionSnapshots,
    setEditLocationDraft,
    setEditLocationId,
    setEditRoomDraft,
    setEditRoomId,
    setEmailInboxes,
    setLeads,
    setLoading,
    setLocations,
    setMarketingSection,
    setMarketingSubjectId,
    setMarketingTab,
    setMe,
    setMediaUrlDrafts,
    setNewEmailInbox,
    setNewRoomDrafts,
    setNewService,
    setNewSubjectName,
    setNewTopicDrafts,
    setNewTutor,
    setOrg,
    setParents,
    setPasswordDraft,
    setPasswordPrompt,
    setProductDraft,
    setProductDraftInitial,
    setProducts,
    setRoomsByLocation,
    setServiceCatalogDrafts,
    setServiceDescriptionDrafts,
    setServiceEdits,
    setServiceLocationId,
    setServiceLogoDrafts,
    setServicesByLocation,
    setServiceSort,
    setSocialDraft,
    setSocialSourceType,
    setSocialSourceTypeSelection,
    setSocialTemplates,
    setStatus,
    setStudents,
    setSubjectDescriptionDrafts,
    setSubjectDrafts,
    setSubjectDraftsInitialKey,
    setSubjects,
    setSubjectSort,
    SETTINGS_TAB_ICON_COLORS,
    SettingsPage,
    setToken,
    setTopicDescriptionDrafts,
    setTopicsBySubject,
    setTutorDrafts,
    setTutors,
    setUserEmail,
    SOCIAL_ASPECT_RATIO_FILE_KEYS,
    SOCIAL_ASPECT_RATIOS,
    SOCIAL_DRAFT_STORAGE_KEY,
    SOCIAL_LAYOUT_PRESET_FILE_KEYS,
    SOCIAL_LAYOUT_PRESETS,
    SOCIAL_PLATFORM_SPECS,
    SOCIAL_PRESET_CAROUSEL_ITEMS,
    SOCIAL_TEMPLATE_STYLES,
    socialAspect,
    socialDraft,
    socialMediaOptions,
    socialPresetCarouselRef,
    socialPresetRefs,
    socialPreviewMedia,
    socialSelectedProduct,
    socialSelectedService,
    socialSelectedSubject,
    socialSelectedTemplate,
    socialSelectedTopic,
    socialSourceType,
    socialTemplates,
    socialTopicOptions,
    sortedArchiveRows,
    sortedServiceRows,
    sortedSubjectDrafts,
    startConnectionOAuth,
    startEditLocation,
    startEditRoom,
    status,
    STUDENT_FIELDS,
    studentDisplayName,
    students,
    studentsByParentId,
    subjectBaselineMap,
    subjectDescriptionDrafts,
    subjectDrafts,
    subjectDraftsInitialKey,
    subjectDraftsInitialRef,
    subjectDraftsKey,
    subjectNameById,
    subjects,
    subjectSort,
    supabase,
    switchTab,
    TAB_DIVIDERS,
    TAB_HEADINGS,
    tabs,
    Textarea,
    timezones,
    toggleArchiveSort,
    toggleServiceSort,
    toggleSocialMedia,
    toggleSocialPlatform,
    toggleSubjectSort,
    token,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    topicDescriptionDrafts,
    topicsBySubject,
    tutorDrafts,
    tutorDraftsInitialRef,
    tutorLimit,
    tutors,
    UNIT_LENGTH_TOOLTIP,
    updateArchive,
    updateArchiveDraft,
    updateClientField,
    updateConnectionField,
    updateNewRoomDraft,
    updatePipelineSource,
    updateServiceDraft,
    US_STATES,
    usageColorClass,
    useEffect,
    useMemo,
    useRef,
    userEmail,
    UserGroupIcon,
    useRouter,
    useSearchParams,
    useSettingsForm,
    useState,
    WebDesign01Icon
  } = ctx;

  return (
    <>
              {!loading && activeTab === "PIPELINE" ? (
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <div className="text-sm font-semibold text-gray-900">
                      Lead pipeline capacity
                    </div>
                    <div className="text-xs text-gray-600">
                      Plan limit:{" "}
                      {leadLimit === null ? "Unlimited" : String(leadLimit)} ·{" "}
                      <span
                        className={usageColorClass(activeLeadCount, leadLimit)}
                      >
                        Current: {activeLeadCount}
                      </span>
                    </div>
                    <button
                      type="button"
                      className="itutoros-settings-btn itutoros-settings-btn-success w-fit"
                      onClick={() => switchTab("ACCOUNT")}
                    >
                      Change Plan
                    </button>
                  </div>

                  <div className="grid gap-3">
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        Lead sources
                      </div>
                      <div className="text-sm text-gray-600">
                        Choose which sources to include for imports.
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="min-w-[640px] border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Include
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Source
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Connected
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {pipelineForm.formData.sources.map((source) => {
                            const status = connectionStatusLabel(source);
                            const statusTone =
                              status === "Connected"
                                ? "text-emerald-600"
                                : "text-amber-600";
                            return (
                              <tr
                                key={source.id}
                                className="border-t border-gray-100"
                              >
                                <td className="px-3 py-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#ff9df9]"
                                    checked={source.enabled}
                                    onChange={(e) =>
                                      updatePipelineSource(source.id, {
                                        enabled: e.target.checked,
                                      })
                                    }
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell
                                    text={`${source.label} ${source.type}`}
                                  >
                                    <span className="font-semibold text-gray-900">
                                      {source.label}
                                    </span>
                                    <br />
                                    <span className="text-xs uppercase tracking-wide text-gray-500">
                                      {source.type}
                                    </span>
                                  </ClampedCell>
                                </td>
                                <td className="px-3 py-2">
                                  <span
                                    className={`text-xs font-semibold ${statusTone}`}
                                  >
                                    {status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid gap-3">
                    <div>
                      <div className="text-base font-semibold text-gray-900">
                        Email inboxes
                      </div>
                      <div className="text-sm text-gray-600">
                        Connect Gmail, Outlook, or IMAP and enable a daily scan
                        to auto-stage leads. Use Pipeline {"\u2192"} Import New
                        Leads to stage with a custom date range.
                      </div>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-gray-200">
                      <table className="min-w-[980px] border-collapse text-sm">
                        <thead className="sticky top-0 z-10 bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]">
                          <tr>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Include
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Provider
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Address
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Daily Scan
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Time
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Last Scan
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Status
                            </th>
                            <th className="px-3 py-2 text-left whitespace-nowrap font-semibold">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeEmailInboxes.length === 0 ? (
                            <tr>
                              <td
                                colSpan={8}
                                className="px-3 py-6 text-center text-sm text-gray-500"
                              >
                                No email inboxes connected yet.
                              </td>
                            </tr>
                          ) : (
                            activeEmailInboxes.map((inbox) => (
                              <tr
                                key={inbox.id}
                                className="border-t border-gray-100"
                              >
                                <td className="px-3 py-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#ff9df9]"
                                    checked={inbox.enabled}
                                    onChange={(e) =>
                                      patchEmailInbox(inbox.id, {
                                        enabled: e.target.checked,
                                      })
                                    }
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell
                                    text={providerLabel(inbox.provider)}
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <ClampedCell text={inbox.address} />
                                </td>
                                <td className="px-3 py-2">
                                  <input
                                    type="checkbox"
                                    className="h-4 w-4 accent-[#ff9df9]"
                                    checked={inbox.daily_scan_enabled}
                                    onChange={(e) =>
                                      patchEmailInbox(inbox.id, {
                                        daily_scan_enabled: e.target.checked,
                                      })
                                    }
                                  />
                                </td>
                                <td className="px-3 py-2">
                                  <Input
                                    type="time"
                                    value={inbox.daily_scan_time ?? "08:00"}
                                    onChange={(e) =>
                                      patchEmailInbox(inbox.id, {
                                        daily_scan_time: e.target.value,
                                      })
                                    }
                                    className="h-9"
                                    disabled={!inbox.daily_scan_enabled}
                                  />
                                </td>
                                <td className="px-3 py-2 text-xs text-gray-600">
                                  {inbox.last_scan_at
                                    ? formatDateWithPattern(
                                        inbox.last_scan_at,
                                        dateFormat,
                                      )
                                    : "Never"}
                                </td>
                                <td className="px-3 py-2">
                                  <span
                                    className={
                                      inbox.has_credentials
                                        ? "text-xs text-emerald-600"
                                        : "text-xs text-rose-500"
                                    }
                                  >
                                    {inbox.has_credentials
                                      ? "Connected"
                                      : "Needs connection"}
                                  </span>
                                </td>
                                <td className="px-3 py-2">
                                  <div className="flex flex-wrap items-center gap-2">
                                    {inbox.provider === "GMAIL" ? (
                                      <button
                                        type="button"
                                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                        onClick={() =>
                                          connectGoogleInbox(inbox.id)
                                        }
                                        disabled={!inbox.enabled}
                                      >
                                        {inbox.has_credentials
                                          ? "Reconnect"
                                          : "Connect"}
                                      </button>
                                    ) : inbox.provider === "OUTLOOK" ? (
                                      <button
                                        type="button"
                                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                                        disabled
                                      >
                                        Connect
                                      </button>
                                    ) : null}
                                    <button
                                      type="button"
                                      className="text-xs font-semibold text-rose-500"
                                      onClick={() =>
                                        archiveEmailInbox(inbox.id)
                                      }
                                    >
                                      Archive
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="grid gap-3 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="text-sm font-semibold text-gray-700">
                      Add email inbox
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Provider</Label>
                        <select
                          className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                          value={newEmailInbox.provider}
                          onChange={(e) =>
                            setNewEmailInbox((prev) => ({
                              ...prev,
                              provider: e.target
                                .value as EmailInbox["provider"],
                            }))
                          }
                        >
                          <option value="GMAIL">Gmail (OAuth)</option>
                          <option value="OUTLOOK">Outlook (OAuth)</option>
                          <option value="IMAP">Generic IMAP</option>
                        </select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Label</Label>
                        <Input
                          value={newEmailInbox.label}
                          onChange={(e) =>
                            setNewEmailInbox((prev) => ({
                              ...prev,
                              label: e.target.value,
                            }))
                          }
                          placeholder="Admissions inbox"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label>Email address</Label>
                        <Input
                          type="email"
                          value={newEmailInbox.address}
                          onChange={(e) =>
                            setNewEmailInbox((prev) => ({
                              ...prev,
                              address: e.target.value,
                            }))
                          }
                          placeholder="info@yourtutoringbusiness.com"
                        />
                      </div>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="grid gap-2">
                        <Label>Daily scan</Label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                          <input
                            type="checkbox"
                            className="h-4 w-4 accent-[#ff9df9]"
                            checked={newEmailInbox.daily_scan_enabled}
                            onChange={(e) =>
                              setNewEmailInbox((prev) => ({
                                ...prev,
                                daily_scan_enabled: e.target.checked,
                              }))
                            }
                          />
                          Enable daily scan
                        </label>
                      </div>
                      <div className="grid gap-2">
                        <Label>Scan time</Label>
                        <Input
                          type="time"
                          value={newEmailInbox.daily_scan_time}
                          onChange={(e) =>
                            setNewEmailInbox((prev) => ({
                              ...prev,
                              daily_scan_time: e.target.value,
                            }))
                          }
                          className="h-10"
                          disabled={!newEmailInbox.daily_scan_enabled}
                        />
                      </div>
                      <div className="text-xs text-gray-500 sm:pt-7">
                        Uses your business timezone.
                      </div>
                    </div>
                    {newEmailInbox.provider === "IMAP" ? (
                      <div className="grid gap-3 sm:grid-cols-4">
                        <div className="grid gap-2 sm:col-span-2">
                          <Label>IMAP host</Label>
                          <Input
                            value={newEmailInbox.imap_host}
                            onChange={(e) =>
                              setNewEmailInbox((prev) => ({
                                ...prev,
                                imap_host: e.target.value,
                              }))
                            }
                            placeholder="imap.gmail.com"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Port</Label>
                          <Input
                            type="number"
                            min={1}
                            value={newEmailInbox.imap_port}
                            onChange={(e) =>
                              setNewEmailInbox((prev) => ({
                                ...prev,
                                imap_port: e.target.value,
                              }))
                            }
                            placeholder="993"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Security</Label>
                          <select
                            className="h-10 rounded-xl border border-gray-200 bg-white px-3"
                            value={
                              newEmailInbox.imap_secure ? "secure" : "insecure"
                            }
                            onChange={(e) =>
                              setNewEmailInbox((prev) => ({
                                ...prev,
                                imap_secure: e.target.value === "secure",
                              }))
                            }
                          >
                            <option value="secure">SSL / TLS</option>
                            <option value="insecure">None</option>
                          </select>
                        </div>
                        <div className="grid gap-2 sm:col-span-2">
                          <Label>Password / token</Label>
                          <Input
                            type="password"
                            value={newEmailInbox.password}
                            onChange={(e) =>
                              setNewEmailInbox((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                            placeholder="App password"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600">
                        OAuth connection will be required after saving. Use the
                        Connect action in the table above.
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        className="itutoros-settings-btn itutoros-settings-btn-secondary"
                        onClick={addEmailInbox}
                      >
                        Add email inbox
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
    </>
  );
}
