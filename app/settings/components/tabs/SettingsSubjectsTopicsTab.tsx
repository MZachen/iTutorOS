// @ts-nocheck
"use client";

export type SettingsSubjectsTopicsTabProps = {
  ctx: Record<string, any>;
};

export default function SettingsSubjectsTopicsTab({ ctx }: SettingsSubjectsTopicsTabProps) {
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
              {!loading && activeTab === "SUBJECTS_TOPICS" ? (
                <div className="grid gap-6">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                    <span>
                      Checkboxes control whether a subject/topic is included.
                    </span>
                    <div className="ml-auto flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleSubjectSort("included")}
                        className={`flex items-center gap-1 whitespace-nowrap text-xs font-semibold uppercase tracking-wide ${
                          subjectSort.key === "included"
                            ? "text-[#ff9df9]"
                            : "text-gray-600"
                        }`}
                      >
                        Included{" "}
                        {renderSortIcons(
                          subjectSort.key === "included",
                          subjectSort.dir,
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleSubjectSort("name")}
                        className={`flex items-center gap-1 whitespace-nowrap text-xs font-semibold uppercase tracking-wide ${
                          subjectSort.key === "name"
                            ? "text-[#ff9df9]"
                            : "text-gray-600"
                        }`}
                      >
                        Subject{" "}
                        {renderSortIcons(
                          subjectSort.key === "name",
                          subjectSort.dir,
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="grid gap-4">
                    {sortedSubjectDrafts.map((subject) => {
                      const subjectIncluded =
                        subject.included ||
                        subject.topics.some((t) => t.included);
                      const baselineSubject = subjectBaselineMap.get(
                        subject.key,
                      );
                      const baselineTopicsByKey = new Map(
                        (baselineSubject?.topics ?? []).map((topic) => [
                          topic.key,
                          topic,
                        ]),
                      );
                      const sortedTopics = [...subject.topics].sort((a, b) => {
                        const aIncluded =
                          baselineTopicsByKey.get(a.key)?.included ?? false;
                        const bIncluded =
                          baselineTopicsByKey.get(b.key)?.included ?? false;
                        const diff = Number(bIncluded) - Number(aIncluded);
                        if (diff !== 0) return diff;
                        return a.name.localeCompare(b.name);
                      });
                      return (
                        <div
                          key={subject.key}
                          className="rounded-xl border border-gray-200 p-4"
                        >
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
                            <div className="grid gap-2">
                              <Label>Subject</Label>
                              <Input
                                value={subject.name}
                                onChange={(e) =>
                                  setSubjectDrafts((prev) =>
                                    prev.map((s) =>
                                      s.key === subject.key
                                        ? { ...s, name: e.target.value }
                                        : s,
                                    ),
                                  )
                                }
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Label className="text-sm">Included</Label>
                              <input
                                type="checkbox"
                                className="h-4 w-4 accent-[#0b1f5f]"
                                checked={subjectIncluded}
                                onChange={(e) =>
                                  setSubjectDrafts((prev) =>
                                    prev.map((s) => {
                                      if (s.key !== subject.key) return s;
                                      const included = e.target.checked;
                                      return {
                                        ...s,
                                        included,
                                        topics: included
                                          ? s.topics
                                          : s.topics.map((t) => ({
                                              ...t,
                                              included: false,
                                            })),
                                      };
                                    }),
                                  )
                                }
                              />
                            </div>
                          </div>

                          <div className="mt-4 grid gap-2">
                            <div className="text-xs font-semibold text-gray-600">
                              Topics
                            </div>
                            <div className="grid gap-2">
                              {sortedTopics.map((topic) => (
                                <div
                                  key={topic.key}
                                  className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-center"
                                >
                                  <Input
                                    value={topic.name}
                                    onChange={(e) =>
                                      setSubjectDrafts((prev) =>
                                        prev.map((s) => {
                                          if (s.key !== subject.key) return s;
                                          return {
                                            ...s,
                                            topics: s.topics.map((t) =>
                                              t.key === topic.key
                                                ? { ...t, name: e.target.value }
                                                : t,
                                            ),
                                          };
                                        }),
                                      )
                                    }
                                    disabled={!subjectIncluded}
                                  />
                                  <div className="flex items-center gap-2">
                                    <Label className="text-sm">Included</Label>
                                    <input
                                      type="checkbox"
                                      className="h-4 w-4 accent-[#0b1f5f]"
                                      checked={topic.included}
                                      disabled={!subjectIncluded}
                                      onChange={(e) =>
                                        setSubjectDrafts((prev) =>
                                          prev.map((s) => {
                                            if (s.key !== subject.key) return s;
                                            return {
                                              ...s,
                                              included: e.target.checked
                                                ? true
                                                : s.included,
                                              topics: s.topics.map((t) =>
                                                t.key === topic.key
                                                  ? {
                                                      ...t,
                                                      included:
                                                        e.target.checked,
                                                    }
                                                  : t,
                                              ),
                                            };
                                          }),
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <Input
                                placeholder="Add a topic…"
                                value={newTopicDrafts[subject.key] ?? ""}
                                onChange={(e) =>
                                  setNewTopicDrafts((prev) => ({
                                    ...prev,
                                    [subject.key]: e.target.value,
                                  }))
                                }
                                disabled={!subjectIncluded}
                                className="max-w-[420px]"
                              />
                              <button
                                type="button"
                                className="itutoros-settings-btn itutoros-settings-btn-primary"
                                onClick={() => addTopic(subject.key)}
                                disabled={!subjectIncluded}
                              >
                                Add topic
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <form onSubmit={addSubject} className="flex flex-wrap gap-2">
                    <Input
                      placeholder="Add a subject…"
                      value={newSubjectName}
                      onChange={(e) => setNewSubjectName(e.target.value)}
                      className="max-w-[420px]"
                    />
                    <button
                      type="submit"
                      className="itutoros-settings-btn itutoros-settings-btn-primary"
                    >
                      Add subject
                    </button>
                  </form>
                </div>
              ) : null}
    </>
  );
}
